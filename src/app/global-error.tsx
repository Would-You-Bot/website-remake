"use client";

import NextError from "next/error";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function GlobalError({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		posthog.captureException(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<h1>Error</h1>
				<p>An error occurred</p>
				<button
					type="button"
					onClick={reset}
				>
					Try again
				</button>
				<NextError statusCode={0} />
			</body>
		</html>
	);
}
