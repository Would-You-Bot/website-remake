import type { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostCardProps {
	post: Post;
}

export function PostCard({ post }: PostCardProps) {
	const link = `/blog/${post.slug}`;
	const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});

	return (
		<li className="flex flex-col gap-4 border p-6 rounded-xl h-full group">
			<div className="rounded-t-md max-h-[240px] overflow-hidden rounded-lg">
				<Image
					src={post.coverImage || "/random.jpg"}
					alt={post.title}
					fill
					loading="eager"
					className="!static object-cover size-full aspect-video group-hover:scale-105 transition duration-500"
				/>
			</div>
			<Link href={link}>
				<h2 className="text-2xl hover:text-muted-foreground transition duration-300">
					{post.title}
				</h2>
			</Link>
			<div className="flex items-center gap-2 font-mono text-muted-foreground">
				<time dateTime={post.publishedAt.toString()}>{formattedDate}</time>
				<span>-</span>
				<p>{post.author.name}</p>
			</div>
			<p className="text-muted-foreground line-clamp-2">{post.description}</p>
			<div className="flex items-center justify-between">
				<a
					href={link}
					className="hover:underline flex items-center gap-2"
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
							className="text-xs text-muted-foreground hover:text-foreground hover:underline"
						>
							<a href={`/tags/${tag.slug}`}>#{tag.name}</a>
						</li>
					))}
				</ul>
			</div>
		</li>
	);
}
