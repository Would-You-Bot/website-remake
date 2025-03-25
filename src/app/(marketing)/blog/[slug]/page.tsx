import { Attribution } from "@/components/blog/attribution";
import { Container } from "@/components/blog/container";
import { PostAuthor } from "@/components/blog/post-author";
import { PostCoverImage } from "@/components/blog/post-cover-image";
import { PostMetadata } from "@/components/blog/post-metadata";
import { Prose } from "@/components/blog/prose";
import { SocialShare } from "@/components/blog/social-share";
import { TableOfContents } from "@/components/blog/toc";
import { calculateReadingTime, formatDate } from "@/lib/blog";
import { getPostBySlug, getPosts } from "@/lib/query";
import { SiteMetadata } from "@/lib/site";
import { ArrowLeft } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import "@/styles/blog.css";

type PageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	try {
		const slug = (await params).slug;
		const post = await getPostBySlug(slug);

		if (!post)
			return {
				title: "Post not found",
				description: "The requested blog post could not be found"
			};

		const previousImages = (await parent).openGraph?.images || [];
		const ogImage =
			post.coverImage ||
			`${SiteMetadata.url}/api/og?title=${encodeURIComponent(post.title)}`;

		return {
			metadataBase: new URL(SiteMetadata.url),
			title: `${post.title} | ${SiteMetadata.title}`,
			description: post.description || SiteMetadata.description,
			authors: [{ name: post.author.name }],
			keywords: [
				...(post.tags?.map((tag) => tag.name) || []),
				post.category.name
			],
			twitter: {
				title: post.title,
				description: post.description || SiteMetadata.description,
				card: "summary_large_image",
				site: SiteMetadata.social?.twitter || SiteMetadata.url,
				images: [
					{
						url: ogImage,
						width: 1200,
						height: 630,
						alt: post.title
					},
					...previousImages
				]
			},
			openGraph: {
				type: "article",
				siteName: SiteMetadata.title,
				locale: "en_US",
				url: `${SiteMetadata.url}/${slug}`,
				images: [
					{
						url: ogImage,
						width: 1200,
						height: 630,
						alt: post.title
					},
					...previousImages
				],
				title: post.title,
				description: post.description || SiteMetadata.description,
				publishedTime: new Date(post.publishedAt).toISOString(),
				modifiedTime: post.updatedAt
					? new Date(post.updatedAt).toISOString()
					: undefined,
				authors: [post.author.name],
				section: post.category.name,
				tags: post.tags?.map((tag) => tag.name)
			}
		};
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {
			title: "Blog Post",
			description: SiteMetadata.description
		};
	}
}

export async function generateStaticParams() {
	try {
		const posts = await getPosts();
		if (!posts || !posts.length) return [];

		return posts.map((post) => ({
			slug: post.slug
		}));
	} catch (error) {
		console.error("Error generating static params:", error);
		return [];
	}
}

async function Page({ params }: PageProps) {
	try {
		const slug = (await params).slug;
		const post = await getPostBySlug(slug);

		if (!post) return notFound();

		const readingTime = calculateReadingTime(post.content);
		const postUrl = `${SiteMetadata.url}/blog/${slug}`;

		return (
			<article className="pb-16">
				<SocialShare
					title={post.title}
					url={postUrl}
				/>

				<Container className="min-h-[calc(100vh-100px)] py-14">
					<Link
						href="/blog"
						className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-8 transition-colors"
					>
						<ArrowLeft className="size-4" />
						<span>Back to blog</span>
					</Link>
					<section className="space-y-6 lg:space-y-8 mx-auto">
						<header className="flex flex-col items-center gap-4">
							{/* <Link
								href={`/blog/category/${post.category.slug}`}
								className="text-xs uppercase tracking-wider px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
							>
								{post.category.name}
							</Link> */}
							<span className="text-xs uppercase tracking-wider px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors hover:cursor-pointer">
								{post.category.name}
							</span>

							<h1 className="text-3xl md:text-4xl font-bold text-center tracking-tight">
								{post.title}
							</h1>

							<PostMetadata
								publishedAt={post.publishedAt}
								readingTime={readingTime}
							/>

							<PostAuthor author={post.author} />

							{post.tags && post.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 justify-center">
									{post.tags.map((tag) => (
										// <Link
										// 	href={`/blog/tag/${tag.slug}`}
										// 	key={tag.id}
										// 	className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
										// >
										// 	{tag.name}
										// </Link>
										<span
											key={tag.id}
											className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors hover:cursor-pointer"
										>
											{tag.name}
										</span>
									))}
								</div>
							)}
						</header>

						<PostCoverImage
							src={post.coverImage}
							alt={`Cover image for ${post.title}`}
						/>

						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
							{/* <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
								<Suspense fallback={<Skeleton className="h-64 w-full" />}>
									<TableOfContents content={post.content} />
								</Suspense>
							</aside> */}

							<div className="lg:col-span-12">
								<Prose html={post.content} />

								<Attribution attribution={post.attribution} />

								{post.updatedAt && post.updatedAt !== post.publishedAt && (
									<div className="text-sm text-muted-foreground italic mt-6">
										Last updated on {formatDate(post.updatedAt)}
									</div>
								)}
							</div>
						</div>
					</section>
				</Container>
			</article>
		);
	} catch (error) {
		console.error("Error rendering post:", error);
		return notFound();
	}
}

export default Page;
