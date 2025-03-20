import { fileURLToPath } from "node:url";
import createNextIntlPlugin from "next-intl/plugin";

import { createJiti } from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./src/env");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "standalone",
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default withNextIntl(nextConfig);
