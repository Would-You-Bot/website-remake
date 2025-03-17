import { Container } from "@/components/blog/container";
import { Prose } from "@/components/blog/prose";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/env";
import { getPosts, getSinglePost } from "@/lib/query";
import { SiteMetadata } from "@/lib/site";
import type { Post } from "@/types/post";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import "@/styles/blog.css";

type PageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const key = env.MARBLE_WORKSPACE_ID;
	const url = env.MARBLE_API_URL.replace(/\/$/, "");

	const slug = (await params).slug;

	const post: Post = await fetch(`${url}/${key}/posts/${slug}`).then((res) =>
		res.json(),
	);

	const previousImages = (await parent).openGraph?.images || [];

	return {
		metadataBase: new URL(SiteMetadata.url),
		title: post.title,
		description: post.description,
		twitter: {
			title: `${post.title}`,
			description: `${post.description || SiteMetadata.description}`,
			card: "summary_large_image",
			site: `${SiteMetadata.url}/${slug}`,
			images: [
				{
					url: post.coverImage,
					width: "1200",
					height: "630",
					alt: post.title,
				},
				...previousImages,
			],
		},
		openGraph: {
			type: "article",
			siteName: "",
			images: [
				{
					url: post.coverImage,
					width: "1200",
					height: "630",
					alt: post.title,
				},
				...previousImages,
			],
			title: post.title,
			description: post.description,
			publishedTime: new Date(post.publishedAt).toISOString(),
			authors: [post.author.name],
		},
	};
}

export async function generateStaticParams() {
	const posts = await getPosts();
	if (!posts) return [];

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

async function Page({ params }: PageProps) {
	const slug = (await params).slug;
	const data = await getSinglePost(slug);
	if (!data) return notFound();

	const formattedDate = new Date(data.publishedAt).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<Container className="min-h-[calc(100vh-100px)] py-14">
			<section className="space-y-6 lg:space-y-8 mx-auto">
				<div className="flex flex-col items-center gap-4">
					<h1 className="text-3xl md:text-4xl font-bold text-center">
						{data.title}
					</h1>
					<time
						dateTime={new Date(data.publishedAt)?.toISOString()}
						className="text-zinc-700 dark:text-zinc-300"
					>
						{formattedDate}
					</time>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage
								src={data.author.image}
								alt={data.author.name || "Random Elephant Image"}
								width={36}
								height={36}
								loading="eager"
								className="aspect-square size-8"
							/>
							<AvatarFallback>{data.author.name.slice(0, 2)}</AvatarFallback>
						</Avatar>
						<p className="text-muted-foreground">{data.author.name}</p>
					</div>
				</div>
				<div className="relative min-h-[360px] md:min-h-[400px] lg:min-h-[430px]">
					<Image
						src={data.coverImage || "/random.jpg"}
						alt={data.title || "Avatar"}
						loading="eager"
						fill
						className="object-cover aspect-video size-full max-sm:max-h-[360px] rounded-lg md:rounded-xl"
					/>
				</div>
				<Prose html={data.content} />
			</section>
		</Container>
	);
}

export default Page;
