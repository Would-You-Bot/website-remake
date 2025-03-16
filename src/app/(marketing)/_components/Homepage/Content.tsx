"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { buttonVariants } from "@/ui/button";

import Link from "next/link";
import MainDiscordEmbed from "./MainDiscordEmbed";
import { AvatarGroup } from "./AvatarGroup";
import type FeaturedServer from "@/types/FeaturedServer";

interface HomeContentProps {
	servers: FeaturedServer[];
}

export default function HomeContent({ servers }: HomeContentProps) {
	return (
		<>
			<section className="mt-0 sm:mt-16 lg:mt-28 flex w-full max-w-8xl flex-col items-center justify-between gap-16 px-8 text-center lg:flex-row lg:text-left">
				<motion.div
					initial={{ opacity: 0, transform: "translateY(20px)" }}
					whileInView={{ opacity: 1, transform: "translateY(0)" }}
					transition={{ duration: 0.7, ease: "easeInOut" }}
					viewport={{ once: true }}
					className="flex flex-col items-center lg:block"
				>
					<h1 className="text-[2rem] sm:text-5xl md:text-6xl font-bold leading-normal mb-8">
						Entertain Your
						<br />
						<span className="text-brand-red-100 drop-shadow-red-glow">Discord</span>{" "}
						<span className="text-brand-blue-100 drop-shadow-blue-glow">Server</span>
					</h1>
					<p className="text-lg text-foreground/70">
						Play fun and entertaining games with Would You, featuring user polls and customization.
						Play Would You Rather, Truth or Dare, Never Have I Ever, Higher or Lower, and What Would
						You Do!
					</p>
					<div className="flex flex-col lg:flex-row mt-8 items-center gap-4">
						<AvatarGroup avatars={servers.reverse().slice(0, 5)} />
						<span className="text-muted-foreground">Trusted by your favorite servers!</span>
					</div>
					<Link
						href="/invite"
						target="_blank"
						className={cn(
							"mt-8 flex gap-2 w-fit justify-center",
							buttonVariants({ variant: "default" })
						)}
					>
						Unleash the Fun
						<svg
							width="13"
							height="13"
							fillRule="evenodd"
							clipRule="evenodd"
							viewBox="0 0 509 511.54"
						>
							<title>Open in new tab icon</title>
							<path
								fillRule="nonzero"
								fill="#fff"
								d="M447.19 347.03c0-17.06 13.85-30.91 30.91-30.91 17.05 0 30.9 13.85 30.9 30.91v87.82c0 21.08-8.63 40.29-22.51 54.18-13.88 13.88-33.09 22.51-54.18 22.51H76.69c-21.09 0-40.3-8.63-54.18-22.51C8.63 475.14 0 455.93 0 434.85V76.69c0-21.09 8.63-40.3 22.51-54.18C36.39 8.63 55.6 0 76.69 0h86.98c17.06 0 30.9 13.85 30.9 30.9 0 17.06-13.84 30.91-30.9 30.91H76.69c-4.07 0-7.82 1.69-10.51 4.37-2.68 2.69-4.37 6.44-4.37 10.51v358.16c0 4.06 1.69 7.82 4.37 10.5 2.69 2.68 6.44 4.38 10.51 4.38h355.62c4.07 0 7.82-1.7 10.51-4.38 2.68-2.68 4.37-6.44 4.37-10.5v-87.82zm0-243.56L308.15 244.28c-11.91 12.12-31.45 12.28-43.56.37-12.11-11.91-12.28-31.45-.37-43.56L401.77 61.81H309.7c-17.06 0-30.9-13.85-30.9-30.91 0-17.05 13.84-30.9 30.9-30.9h168.4C495.15 0 509 13.85 509 30.9v165.04c0 17.06-13.85 30.9-30.9 30.9-17.06 0-30.91-13.84-30.91-30.9v-92.47z"
							/>
						</svg>
					</Link>
				</motion.div>
				<MainDiscordEmbed />
			</section>
		</>
	);
}
