import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(__dirname, "../../"),
	transpilePackages: ["prismjs"],
	serverExternalPackages: ["@prisma/adapter-pg", "pg"],
	experimental: {
		serverActions: {
			bodySizeLimit: "50mb",
		},
	},
};

export default nextConfig;
