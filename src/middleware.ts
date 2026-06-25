import { type NextRequest, NextResponse } from "next/server";
import { isAdminAllowed } from "@/lib/ip";

export function middleware(req: NextRequest) {
	if (process.env.NODE_ENV !== "production" || process.env.DISABLE_ADMIN_GATE === "true") {
		return NextResponse.next();
	}
	
	if (isAdminAllowed(req.headers)) {
		return NextResponse.next();
	}
	
	const url = req.nextUrl.clone();
	url.pathname = "/vpn-required";
	url.search = "";
	return NextResponse.rewrite(url);
}

export const config = {
	matcher: ["/admin", "/admin/:path*"],
};
