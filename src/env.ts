import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		UPSTASH_API_KEY: z.string(),
	},
	client: {
		// client variables are public and can be accessed by the client
	},
	experimental__runtimeEnv: {
		// same as defined in client
	},
});
