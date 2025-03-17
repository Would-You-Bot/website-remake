import type { Post, Tag } from "@/types/post";
import { env } from "@/env";

const url = env.MARBLE_API_URL.replace(/\/$/, "");
const key = env.MARBLE_WORKSPACE_KEY;

export async function getPosts() {
	console.log(" getPosts ~ fetch ", `${url}/${key}/posts`);
	try {
		const raw = await fetch(`${url}/${key}/posts`);
		const data: Post[] = await raw.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function getTags() {
	try {
		const raw = await fetch(`${url}/${key}/tags`);
		const data: Tag[] = await raw.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function getSinglePost(slug: string) {
	try {
		const raw = await fetch(`${url}/${key}/posts/${slug}`);
		const data: Post = await raw.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}
