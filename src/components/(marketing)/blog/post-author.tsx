import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Author } from "@/types/post";

export function PostAuthor({ authors }: { authors: Author[] }) {
	if (!authors) {
		return null;
	}

	return authors.map((author) => (
		<div
			className="flex items-center gap-2"
			aria-label={`Author: ${author.name}`}
			key={author.name}
		>
			<Avatar>
				<AvatarImage
					src={author.image}
					alt={`${author.name}'s profile picture`}
					width={36}
					height={36}
					loading="eager"
					className="aspect-square size-8"
				/>
				<AvatarFallback>{author.name?.slice(0, 2) || "AU"}</AvatarFallback>
			</Avatar>
			<p className="text-muted-foreground">{author.name}</p>
		</div>
	));
}
