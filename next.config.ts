import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const jiti = createJiti(fileURLToPath(import.meta.url));

const loadEnv = async () => {
	await jiti.import("./src/env");
};
loadEnv().catch(console.error);

const withNextIntl = createNextIntlPlugin({
	experimental: {
		createMessagesDeclaration: "./src/i18n/translations/en.json"
	}
});

const nextConfig: NextConfig = {
	output: "standalone",
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "/**"
			},
			{
				protocol: "https",
				hostname: "cdn.wouldyoubot.gg",
				port: "",
				pathname: "/**"
			},
			{
				protocol: "https",
				hostname: "startupfa.me",
				port: "",
				pathname: "/**"
			},
			{
				protocol: "https",
				hostname: "images.marblecms.com",
				port: "",
				pathname: "/**"
			}
		]
	},
	headers: async () => [
		{
			source: "/(.*)",
			headers: [
				{
					key: "Strict-Transport-Security",
					value: "max-age=31536000; includeSubDomains; preload"
				},
				{
					key: "Content-Security-Policy",
					value: "frame-ancestors 'self' https://top.gg https://bottom.gg;"
				},
				{
					key: "X-Frame-Options",
					value: "SAMEORIGIN"
				},
				{
					key: "Referrer-Policy",
					value: "origin-when-cross-origin"
				},
				{
					key: "X-Content-Type-Options",
					value: "nosniff"
				}
			]
		}
	],
	redirects: async () => [
		{
			source: "/support",
			destination: "https://discord.com/invite/vMyXAxEznS",
			permanent: true
		},
		{
			source: "/rivo",
			destination: "https://rivo.gg",
			permanent: true
		},
		{
			source: "/invite",
			destination:
				"https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=275415247936&scope=bot%20applications.commands",
			permanent: true
		},
		{
			source: "/reddit",
			destination: "https://www.reddit.com/r/WouldYou/",
			permanent: true
		},
		{
			source: "/discord",
			destination: "/support",
			permanent: true
		},
		{
			source: "/imprint",
			destination: "/legal",
			permanent: true
		},
		{
			source: "/impressum",
			destination: "/legal-de",
			permanent: true
		}
	]
};

export default withNextIntl(nextConfig);
