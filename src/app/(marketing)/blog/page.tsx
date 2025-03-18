import { Container } from "@/components/blog/container";
import { PostCard } from "@/components/blog/post-card";
import { getPosts } from "@/lib/query";

export default async function HomePage() {
	const posts = await getPosts();
	if (!posts || !posts.length) return <div>No posts yet</div>;

	return (
		<section>
			<Container className="py-10">
				<ul className="grid justify-center gap-20 grid-cols-[repeat(auto-fill,minmax(0,_400px))] w-full">
					{posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</ul>
			</Container>
		</section>
	);
}
