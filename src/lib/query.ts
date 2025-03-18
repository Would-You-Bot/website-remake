import { env } from "@/env";
import type { Post, Tag } from "@/types/post";

/**
 * API client for Marble content services
 */
class MarbleApiService {
	private readonly baseUrl: string;

	constructor() {
		const url = env.MARBLE_API_URL.replace(/\/$/, "");
		const workspaceId = env.MARBLE_WORKSPACE_ID;
		this.baseUrl = `${url}/${workspaceId}`;
	}

	/**
	 * Generic fetch method with error handling
	 */
	private async fetchData<T>(endpoint: string): Promise<T> {
		try {
			const response = await fetch(`${this.baseUrl}/${endpoint}`);

			if (!response.ok) {
				throw new Error(`API error: ${response.status} ${response.statusText}`);
			}

			return (await response.json()) as T;
		} catch (error) {
			console.error(`Error fetching ${endpoint}:`, error);
			throw error;
		}
	}

	/**
	 * Get all posts
	 */
	async getPosts(): Promise<Post[]> {
		return await this.fetchData<Post[]>("posts");
	}

	/**
	 * Get a single post by its slug
	 */
	async getPostBySlug(slug: string): Promise<Post> {
		if (!slug) {
			throw new Error("Post slug is required");
		}
		return await this.fetchData<Post>(`posts/${slug}`);
	}

	/**
	 * Get all tags
	 */
	async getTags(): Promise<Tag[]> {
		return await this.fetchData<Tag[]>("tags");
	}

	/**
	 * Get posts filtered by tag
	 */
	async getPostsByTag(slug: string): Promise<Post[]> {
		if (!slug) {
			throw new Error("Tag ID is required");
		}
		return await this.fetchData<Post[]>(`tags/${slug}/posts`);
	}
}

// Export a singleton instance for use throughout the application
export const marbleApi = new MarbleApiService();

// Export individual methods for convenience
export const getPosts = () => marbleApi.getPosts();
export const getPostBySlug = (slug: string) => marbleApi.getPostBySlug(slug);
export const getTags = () => marbleApi.getTags();
export const getPostsByTag = (tagId: string) => marbleApi.getPostsByTag(tagId);
