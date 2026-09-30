import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	outputFileTracingRoot: __dirname,
	transpilePackages: ["prismjs"],
	serverExternalPackages: ["@prisma/adapter-pg", "pg"],
	experimental: {
		serverActions: {
			bodySizeLimit: "50mb",
		},
	},
};

export default nextConfig;
