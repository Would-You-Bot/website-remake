import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DISCORD_CLIENT_ID: z.string(),
		DISCORD_CLIENT_SECRET: z.string(),
		UPSTASH_API_KEY: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.string().url(),
		DATABASE_URL: z.string()
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url()
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
	}
});
