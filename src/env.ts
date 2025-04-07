import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DISCORD_CLIENT_ID: z.string(),
		DISCORD_CLIENT_SECRET: z.string(),
		UPSTASH_URL: z.string().url(),
		UPSTASH_API_KEY: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.string().url(),
		DATABASE_URL: z.string()
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
		NEXT_PUBLIC_POSTHOG_KEY: z.string().startsWith("phc_").min(35),
		NEXT_PUBLIC_POSTHOG_HOST: z.string().url().includes("posthog.com")
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
		NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST
	}
});
