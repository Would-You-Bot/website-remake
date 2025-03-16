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
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.wouldyoubot.gg",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;

