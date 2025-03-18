"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { buttonVariants } from "@/ui/button";

import Link from "next/link";
import type FeaturedServer from "@/types/FeaturedServer";
import MainDiscordEmbed from "@/components/(marketing)/home/main-discord-embed";
import { AvatarGroup } from "@/components/(marketing)/home/avatar-group";
import { ExternalLink } from "lucide-react";

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
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
						Entertain Your
						<br />
						<span className="text-primary">Discord</span>{" "}
						<span className="text-secondary">Server</span>
					</h1>
					<p className="text-lg text-muted-foreground">
						Play fun and entertaining games with Would You, featuring user polls
						and customization. Play Would You Rather, Truth or Dare, Never Have
						I Ever, Higher or Lower, and What Would You Do!
					</p>
					<div className="flex flex-col lg:flex-row mt-8 items-center gap-2">
						<AvatarGroup avatars={servers.reverse().slice(0, 5)} />
						<span className="text-muted-foreground">
							Trusted by your favorite servers!
						</span>
					</div>
					<Link
						href="/invite"
						target="_blank"
						className={cn(
							"mt-8 flex gap-2 w-fit justify-center",
							buttonVariants({ variant: "default" }),
						)}
					>
						Unleash the Fun <ExternalLink />
					</Link>
				</motion.div>
				<MainDiscordEmbed />
			</section>
		</>
	);
}
