import { cn } from "@/lib/utils";
import type { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
	post: Post;
	className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
	const link = `/blog/${post.slug}`;
	const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});

	return (
		<li
			className={cn(
				"group flex h-full flex-col gap-4 rounded-xl border p-6",
				className
			)}
		>
			<div className="max-h-[240px] overflow-hidden rounded-lg rounded-t-md">
				<Image
					rounded-t-md
					src={post.coverImage || "/random.jpg"}
					alt={post.title}
					fill
					loading="eager"
					className="!static aspect-video size-full object-cover transition duration-500 group-hover:scale-105"
				/>
			</div>
			<Link href={link}>
				<h2 className="text-2xl transition duration-300 hover:text-muted-foreground">
					{post.title}
				</h2>
			</Link>
			<div className="flex items-center gap-2 font-mono text-muted-foreground">
				<time dateTime={post.publishedAt.toString()}>{formattedDate}</time>
				<span>-</span>
				<div className="flex flex-wrap gap-1">
					{post.authors.map((author, i) => (
						<p
							key={author.id}
							className="hover:underline"
						>
							{i !== 0 && ", "}
							{author.name}
						</p>
					))}
				</div>
			</div>
			<p className="line-clamp-2 text-muted-foreground">{post.description}</p>
			<div classNameline-clamp-2="flex items-center jn">
				<a
					href={link}
					className="flex items-center gap-2 hover:underline"
				>
					<span>Read post</span>
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="size-3"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
						/>
					</svg>
				</a>
				<ul className="flex items-center gap-2">
					{post.tags.map((tag) => (
						<li
							key={tag.id}
							className="text-muted-foreground text-xs hover:text-foreground hover:underline"
						>
							<a href={`/tags/${tag.slug}`}>#{tag.name}</a>
						</li>
					))}
				</ul>
			</div>
		</li>
	);
}
