import { env } from "@/env";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_APP_URL || "http://localhost:2123",
	plugins: [inferAdditionalFields<typeof auth>()]
});
