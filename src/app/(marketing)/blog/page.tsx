import { Container } from "@/components/(marketing)/blog/container";
import { PostCard } from "@/components/(marketing)/blog/post-card";
import { getPosts } from "@/lib/query";

export default async function HomePage() {
	const posts = await getPosts();
	if (!posts || !posts.length) {
		return <div>No posts yet</div>;
	}

	return (
		<Container className="py-10">
			<ul className="flex flex-wrap justify-center gap-16">
				{posts.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						className="basis-md"
					/>
				))}
			</ul>
		</Container>
	);
}
