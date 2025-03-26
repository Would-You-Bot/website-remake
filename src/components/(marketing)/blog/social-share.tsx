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
		<div className="md:-translate-y-1/2 fixed right-6 bottom-6 z-10 md:top-1/2 md:right-6 md:bottom-auto">
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
