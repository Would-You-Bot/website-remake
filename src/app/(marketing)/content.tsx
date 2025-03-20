"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Button, buttonVariants } from "@/ui/button";

import Link from "next/link";
import type FeaturedServer from "@/types/FeaturedServer";
import MainDiscordEmbed from "@/components/(marketing)/home/embeds/main-discord-embed";
import { AvatarGroup } from "@/components/(marketing)/home/avatar-group";
import { ExternalLink } from "lucide-react";
import { LandingWave } from "@/components/icons/landing-wave";
import ServerMarquee from "@/components/(marketing)/home/server-marquee";
import FeatureItem from "@/components/(marketing)/home/feature-item";
import DailyMessageEmbed from "@/components/(marketing)/home/embeds/daily-message-embed";
import HigherLowerEmbed from "@/components/(marketing)/home/embeds/higher-lower-embed";
import NeverHaveIEverEmbed from "@/components/(marketing)/home/embeds/never-have-ever-embed";

interface HomeContentProps {
	serverCount: number;
	servers: FeaturedServer[];
}

export default function HomeContent({
	serverCount,
	servers,
}: HomeContentProps) {
	const date = new Date();
	const currentDate = date.toLocaleString();

	const threadName = `${[
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
	].join("/")} - Daily Message`;

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
						Unleash the Fun
						<ExternalLink />
					</Link>
				</motion.div>
				<MainDiscordEmbed />
			</section>

			<section id="slider" className="mt-36">
				<LandingWave className="min-w-[2560px] text-popover" />
				<div className="w-full bg-popover px-8 pb-12 text-center text-4xl md:text-5xl text-foreground md:pb-28">
					<div className="">
						<h2>
							Trusted by{" "}
							<span className="font-bold text-primary">
								{serverCount.toLocaleString()}+
							</span>{" "}
							communities
						</h2>
						<h3 className="mt-4 text-2xl md:text-3xl px-12">
							keeping{" "}
							<span className="font-bold text-secondary">4,000,000+</span> users
							entertained
						</h3>
					</div>

					<div>
						<ServerMarquee
							servers={servers.slice(0, Math.ceil(servers.length / 2))}
							speed={40}
						/>
						<ServerMarquee
							servers={servers.slice(Math.ceil(servers.length / 2))}
							speed={30}
							direction="right"
						/>
					</div>
				</div>
			</section>

			<section className="mt-20 flex w-full max-w-8xl flex-col items-center gap-20 px-8 text-foreground">
				<motion.div
					initial={{ opacity: 0, transform: "translateY(15px)" }}
					whileInView={{ opacity: 1, transform: "translateY(0)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
					className="flex flex-col items-center"
				>
					<h2 className="text-primary text-6xl font-bold">Features</h2>
					<h3 className="mt-4 text-center text-2xl">
						What Does Would You Offer To Your Server?
					</h3>
				</motion.div>

				<FeatureItem
					reverse
					right={<DailyMessageEmbed threadName={threadName} />}
					left={
						<>
							<h4 className="text-center text-3xl font-bold md:text-left">
								Increase user engagement
							</h4>
							<p className="mx-auto text-center text-lg text-muted-foreground md:text-left">
								Keep your community engaged and active with daily &quot;Would
								You Rather&quot; messages!
							</p>
						</>
					}
				/>

				<FeatureItem
					left={
						<>
							<h4 className="text-center text-3xl font-bold md:text-left">
								Entertain your server
							</h4>
							<p className="text-center text-lg text-muted-foreground md:text-left">
								Entertain your Discord server with fun and interactive games
								like Would You Rather, Truth or Dare, Never Have I Ever, Higher
								or Lower, and What Would You Do!
							</p>
						</>
					}
					right={<HigherLowerEmbed currentDate={currentDate} />}
				/>

				<FeatureItem
					reverse
					right={<NeverHaveIEverEmbed />}
					left={
						<>
							<h4 className="text-center text-3xl font-bold md:text-left">
								Upgrade your server
							</h4>
							<p className="text-center text-lg text-foreground/70 md:text-left">
								Upgrade your server with Would You, featuring a wide variety of
								games and customized questions.
							</p>
						</>
					}
				/>
			</section>

			<section className="mt-36 w-full bg-card/20 px-9 py-12 border-y-border border border-transparent">
				<motion.h2
					initial={{ opacity: 0, transform: "translateY(10px)" }}
					whileInView={{ opacity: 1, transform: "translateY(0)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.65, ease: "easeInOut" }}
					className="text-center text-5xl font-bold leading-normal text-foreground"
				>
					Keep Your Server Active with{" "}
					<span className="text-primary font-bold">Would</span>{" "}
					<span className="text-secondary">You</span>
				</motion.h2>
				<motion.h3
					initial={{ opacity: 0, transform: "translateY(10px)" }}
					whileInView={{ opacity: 1, transform: "translateY(0)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.65, ease: "easeInOut" }}
					className="mt-4 text-center text-xl text-muted-foreground"
				>
					Invite To Your Server Now!
				</motion.h3>
				<motion.div
					initial={{ opacity: 0, transform: "translateY(-20px)" }}
					whileInView={{ opacity: 1, transform: "translateY(0)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.65, ease: "easeInOut" }}
					className="mt-8 flex justify-center"
				>
					<Link href="/invite" target="_blank">
						<Button>Invite</Button>
					</Link>
				</motion.div>
			</section>
		</>
	);
}
