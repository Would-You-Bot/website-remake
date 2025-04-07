"use client";

import { authClient } from "@/lib/auth-client";
import posthog from "posthog-js";
import { type ReactNode, useEffect } from "react";

export default function IdentifyProvider({
	children
}: { children: ReactNode }) {
	const { data: session } = authClient.useSession();

	useEffect(() => {
		if (session) {
			console.debug("user id", session.user);

			posthog.identify(session.session.userId, {
				id: session.user.discordId,
				name: session.user.name
			});
		}
	}, [session]);

	return <>{children}</>;
}
