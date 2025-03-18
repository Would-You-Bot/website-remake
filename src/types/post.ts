/**
 * Represents a blog post author
 */
export type Author = {
	id?: string;
	name: string;
	image: string;
	bio?: string;
	socialLinks?: {
		twitter?: string;
		github?: string;
		linkedin?: string;
		website?: string;
	};
};

/**
 * Represents a content attribution source
 */
export type Attribution = {
	author: string;
	url: string;
	license?: string;
	licenseUrl?: string;
};

/**
 * Represents a content category
 */
export type Category = {
	id: string;
	name: string;
	slug: string;
	description?: string;
	parentId?: string;
};

/**
 * Represents a content tag
 */
export type Tag = {
	id: string;
	name: string;
	slug: string;
	description?: string;
};

/**
 * Represents the status of a post
 */
export enum PostStatus {
	DRAFT = "draft",
	PUBLISHED = "published",
	ARCHIVED = "archived",
}

/**
 * Represents SEO-related metadata for a post
 */
export type PostSeo = {
	metaTitle?: string;
	metaDescription?: string;
	canonicalUrl?: string;
	ogImage?: string;
	noIndex?: boolean;
};

/**
 * Represents a complete blog post
 */
export type Post = {
	id: string;
	slug: string;
	title: string;
	content: string;
	description: string;
	coverImage: string;
	publishedAt: Date;
	updatedAt?: Date;
	author: Author;
	category: Category;
	tags: Tag[];
	attribution: Attribution | null;
	status?: PostStatus;
	readingTime?: number;
	seo?: PostSeo;
	relatedPosts?: string[]; // IDs of related posts
	featured?: boolean;
	excerpt?: string; // A short excerpt for previews
	toc?: TableOfContents[]; // Table of contents
};

/**
 * Represents a table of contents item
 */
export type TableOfContents = {
	id: string;
	text: string;
	level: number;
	children?: TableOfContents[];
};

/**
 * Represents a lightweight version of a post for listings
 */
export type PostPreview = Pick<
	Post,
	| "id"
	| "slug"
	| "title"
	| "description"
	| "coverImage"
	| "publishedAt"
	| "author"
	| "category"
	| "tags"
	| "featured"
	| "excerpt"
>;

/**
 * Utility type for post creation
 */
export type CreatePostInput = Omit<Post, "id" | "publishedAt" | "updatedAt"> & {
	publishedAt?: Date;
};

/**
 * Utility type for post updates
 */
export type UpdatePostInput = Partial<Omit<Post, "id">>;

/**
 * Parameters for post queries
 */
export type PostQueryParams = {
	limit?: number;
	offset?: number;
	categorySlug?: string;
	tagSlug?: string;
	authorId?: string;
	featured?: boolean;
	status?: PostStatus;
	search?: string;
	sortBy?: "publishedAt" | "updatedAt" | "title";
	sortOrder?: "asc" | "desc";
};
