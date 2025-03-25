"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function SocialShare({ title, url }: { title: string; url: string }) {
	const sharePost = () => {
		if (navigator.share) {
			navigator
				.share({
					title,
					url
				})
				.catch((err) => console.error("Error sharing:", err));
		} else {
			navigator.clipboard
				.writeText(url)
				.then(() => alert("Link copied to clipboard!"))
				.catch((err) => console.error("Failed to copy:", err));
		}
	};

	return (
		<div className="fixed bottom-6 right-6 z-10 md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2">
			<Button
				onClick={sharePost}
				variant="secondary"
				size="icon"
				className="rounded-full shadow-md"
				aria-label="Share this post"
			>
				<Share2 className="size-5" />
			</Button>
		</div>
	);
}
