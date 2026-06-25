import { createHash } from "node:crypto";

/** Computes the lowercase hex sha-256 of the given bytes. */
export function sha256(data: Buffer | Uint8Array): string {
	return createHash("sha256").update(data).digest("hex");
}
