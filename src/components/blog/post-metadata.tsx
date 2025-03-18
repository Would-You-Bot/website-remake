import { formatDate } from "@/lib/blog";
import { Calendar, Clock } from "lucide-react";

export function PostMetadata({
	publishedAt,
	readingTime,
}: {
	publishedAt: Date;
	updatedAt?: Date;
	readingTime: string;
}) {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
			<div className="flex items-center gap-1">
				<Calendar className="size-4" />
				<time
					dateTime={new Date(publishedAt).toISOString()}
					aria-label={`Published on ${formatDate(publishedAt)}`}
				>
					{formatDate(publishedAt)}
				</time>
			</div>

			<div className="flex items-center gap-1">
				<Clock className="size-4" />
				<span>{readingTime} min read</span>
			</div>
		</div>
	);
}
