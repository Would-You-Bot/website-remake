import { getPosts } from "@/lib/query";
import { Fragment } from "react";
import { Container } from "./_components/container";
import { PostCard } from "./_components/post-card";

export default async function HomePage() {
	const posts = await getPosts();
	if (!posts || !posts.length) return <div>No posts yet</div>;

	return (
		<section>
			<Container className="py-10">
				<ul className="grid justify-center gap-20 grid-cols-[repeat(auto-fill,minmax(0,_400px))] w-full">
					{posts.map((post) => (
						<Fragment key={post.id}>
							<PostCard post={post} />
						</Fragment>
					))}
				</ul>
			</Container>
		</section>
	);
}
