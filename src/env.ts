import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		MARBLE_WORKSPACE_KEY: z.string().cuid(),
		MARBLE_API_URL: z.string().url(),
	},
	client: {
		// client variables are public and can be accessed by the client
	},
	experimental__runtimeEnv: {
		// same as defined in client
	},
});
