import { Container } from "../_components/container";
import { Prose } from "../_components/prose";
import { env } from "@/env";
import { getPosts, getSinglePost } from "@/lib/query";
import { SiteMetadata } from "@/lib/site";
import type { Post } from "@/types/post";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

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
			<section className="space-y-6 lg:space-y-8 max-w-3xl mx-auto">
				<div className="flex flex-col items-center gap-4">
					<h1 className="font-serif text-3xl lg:text-4xl text-center">
						{data.title}
					</h1>
					<time dateTime={new Date(data.publishedAt)?.toISOString()}>
						{formattedDate}
					</time>
					<div className="flex items-center gap-2">
						<Image
							src={"/avatar.png"}
							// src={data.author.image ?? "/avatar.png"}
							alt={data.author.name || "Random Elephant Image"}
							width={36}
							height={36}
							loading="eager"
							className="aspect-square shrink-0 size-8 rounded-full"
						/>
						<p className="text-muted-foreground">{data.author.name}</p>
					</div>
				</div>
				<div className="relative min-h-[360px] md:min-h-[400px] lg:min-h-[430px]">
					<Image
						src={data.coverImage || "/random.jpg"}
						alt={data.title || "Avatar"}
						loading="eager"
						fill
						className="object-cover size-full max-sm:max-h-[360px]"
					/>
				</div>
				<Prose html={data.content} />
			</section>
		</Container>
	);
}

export default Page;
