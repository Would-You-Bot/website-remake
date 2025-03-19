import { fileURLToPath } from "node:url";

import { createJiti } from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "standalone",
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
	images: {
		domains: ["flagcdn.com"],
	},
	async rewrites() {
		return [
			{
				source: "/:path*", // Match all paths
				has: [{ type: "cookie", key: "NEXT_LOCALE" }], // Use the saved locale
				destination: "/:path*", // Rewrite without changing the URL
			},
		];
	},
};

export default nextConfig;
