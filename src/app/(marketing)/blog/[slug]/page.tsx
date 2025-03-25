import { Attribution } from "@/components/blog/attribution";
import { Container } from "@/components/blog/container";
import { PostAuthor } from "@/components/blog/post-author";
import { PostCoverImage } from "@/components/blog/post-cover-image";
import { PostMetadata } from "@/components/blog/post-metadata";
import { Prose } from "@/components/blog/prose";
import { SocialShare } from "@/components/blog/social-share";
import { calculateReadingTime, formatDate } from "@/lib/blog";
import { getPostBySlug, getPosts } from "@/lib/query";
import { SiteMetadata } from "@/lib/site";
import { ArrowLeft } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

		if (!post) {
			return {
				title: "Post not found",
				description: "The requested blog post could not be found"
			};
		}

		const previousImages = (await parent).openGraph?.images || [];
		const ogImage =
			post.coverImage ||
			`${SiteMetadata.url}/api/og?title=${encodeURIComponent(post.title)}`;

		return {
			metadataBase: new URL(SiteMetadata.url),
			title: `${post.title} | ${SiteMetadata.title}`,
			description: post.description || SiteMetadata.description,
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
				authors: [...post.authors.map((author) => author.name)],
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
		if (!posts || !posts.length) {
			return [];
		}

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

		if (!post) {
			return notFound();
		}

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
						className="mb-8 flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
					>
						<ArrowLeft className="size-4" />
						<span>Back to blog</span>
					</Link>
					<section className="mx-auto space-y-6 lg:space-y-8">
						<header className="flex flex-col items-center gap-4">
							{/* <Link
								href={`/blog/category/${post.category.slug}`}
								className="text-xs uppercase tracking-wider px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
							>
								{post.category.name}
							</Link> */}
							<span className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-wider transition-colors hover:cursor-pointer hover:bg-muted/80">
								{post.category.name}
							</span>

							<h1 className="text-center font-bold text-3xl tracking-tight md:text-4xl">
								{post.title}
							</h1>

							<PostMetadata
								publishedAt={post.publishedAt}
								readingTime={readingTime}
							/>

							<PostAuthor authors={post.authors} />

							{post.tags && post.tags.length > 0 && (
								<div className="flex flex-wrap justify-center gap-2">
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
											className="rounded-full bg-muted px-3 py-1 text-sm transition-colors hover:cursor-pointer hover:bg-muted/80"
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

						<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
							{/* <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
								<Suspense fallback={<Skeleton className="h-64 w-full" />}>
									<TableOfContents content={post.content} />
								</Suspense>
							</aside> */}

							<div className="lg:col-span-12">
								<Prose html={post.content} />

								<Attribution attribution={post.attribution} />

								{post.updatedAt && post.updatedAt !== post.publishedAt && (
									<div className="mt-6 text-muted-foreground text-sm italic">
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
