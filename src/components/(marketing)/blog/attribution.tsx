import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Attribution({
	attribution
}: { attribution: { author: string; url: string } | null }) {
	if (!attribution) { return null; }

	return (
		<div className="mt-8 text-muted-foreground text-sm italic">
			<p>
				Originally written by {attribution.author}.
				<Link
					href={attribution.url}
					className="ml-1 inline-flex items-center hover:text-primary"
					target="_blank"
					rel="noopener noreferrer"
				>
					View original <ArrowUpRight className="ml-1 size-3" />
				</Link>
			</p>
		</div>
	);
}
