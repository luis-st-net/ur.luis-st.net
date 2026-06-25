/**
 * Helpers for the VPN/admin gate. nginx forwards the real client IP; we match
 * it against the allowed CIDR (default 10.2.0.0/16) to decide whether a request
 * may reach the /admin route.
 */

/** Reads the configured allowed CIDR for the admin route. */
export function adminAllowedCidr(): string {
	return process.env.ADMIN_ALLOWED_CIDR || "10.2.0.0/16";
}

/**
 * Extracts the client IP from the standard forwarding headers set by nginx.
 * Prefers the left-most entry of X-Forwarded-For, falling back to X-Real-IP.
 */
export function clientIpFromHeaders(headers: Headers): string | null {
	const forwarded = headers.get("x-forwarded-for");
	if (forwarded) {
		const first = forwarded.split(",")[0]?.trim();
		if (first) {
			return normalizeIp(first);
		}
	}
	const real = headers.get("x-real-ip");
	if (real) {
		return normalizeIp(real.trim());
	}
	return null;
}

/** Strips IPv6-mapped IPv4 prefixes and brackets/ports where present. */
function normalizeIp(ip: string): string {
	let value = ip;
	// ::ffff:10.2.0.1 -> 10.2.0.1
	const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
	if (mapped) {
		value = mapped[1];
	}
	// 10.2.0.1:12345 -> 10.2.0.1 (do not strip ports from IPv6)
	if (value.includes(".") && value.includes(":")) {
		value = value.split(":")[0];
	}
	return value;
}

function ipv4ToInt(ip: string): number | null {
	const parts = ip.split(".");
	if (parts.length !== 4) {
		return null;
	}
	let result = 0;
	for (const part of parts) {
		const n = Number(part);
		if (!Number.isInteger(n) || n < 0 || n > 255) {
			return null;
		}
		result = (result << 8) + n;
	}
	return result >>> 0;
}

/** Returns true when the given IPv4 address falls inside the CIDR range. */
export function ipInCidr(ip: string, cidr: string): boolean {
	const [range, bitsRaw] = cidr.split("/");
	const bits = bitsRaw === undefined ? 32 : Number(bitsRaw);
	if (!Number.isInteger(bits) || bits < 0 || bits > 32) {
		return false;
	}
	
	const ipInt = ipv4ToInt(ip);
	const rangeInt = ipv4ToInt(range);
	if (ipInt === null || rangeInt === null) {
		return false;
	}
	
	if (bits === 0) {
		return true;
	}
	const mask = (0xffffffff << (32 - bits)) >>> 0;
	return (ipInt & mask) === (rangeInt & mask);
}

/** Convenience: is the request's client IP allowed to reach /admin? */
export function isAdminAllowed(headers: Headers): boolean {
	const ip = clientIpFromHeaders(headers);
	if (!ip) {
		return false;
	}
	return ipInCidr(ip, adminAllowedCidr());
}
