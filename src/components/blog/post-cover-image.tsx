import Image from "next/image";

export function PostCoverImage({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="relative min-h-[360px] md:min-h-[400px] lg:min-h-[430px]">
			<Image
				src={src || "/images/placeholder-post.jpg"}
				alt={alt}
				className="object-cover aspect-video size-full max-sm:max-h-[360px] rounded-lg md:rounded-xl"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 80vw"
				loading="eager"
				priority
				fill
			/>
		</div>
	);
}
