"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";

const recommendedLinks = [
	{
		name: "Home",
		link: "/",
		EventTarget: "_self",
	},
	{
		name: "Commands",
		link: "/commands",
		EventTarget: "_self",
	},
	{
		name: "Team",
		link: "/team",
		EventTarget: "_self",
	},
	{
		name: "Reddit",
		link: "/reddit",
		EventTarget: "_blank",
	},
];

const Links = [
	{
		name: "Support Server",
		link: "/discord",
		EventTarget: "_blank",
	},
	{
		name: "Invite",
		link: "/invite",
		EventTarget: "_blank",
	},
	{
		name: "Status",
		link: "/status",
		EventTarget: "_self",
	},
];

const LegalLinks = [
	{
		name: "Legal Notice",
		link: "/legal",
		EventTarget: "_self",
	},
	{
		name: "Privacy Policy",
		link: "/privacy",
		EventTarget: "_self",
	},
	{
		name: "Terms of Service",
		link: "/terms",
		EventTarget: "_self",
	},
	{
		name: "Refund Policy",
		link: "/refunds",
		EventTarget: "_self",
	},
];

export default function Footer() {
	const { theme } = useTheme();

	return (
		<footer className="mt-20 mx-auto w-full max-w-8xl px-8 py-8">
			<div className="mb-8 flex flex-col justify-between gap-4 text-muted-foreground md:flex-row">
				<div className="flex w-full flex-col items-center md:mr-4 md:items-start gap-3">
					<div className="flex items-center text-xl font-bold text-foreground">
						<Image
							src="/Logo.svg"
							alt="Logo"
							className="rounded-full"
							width={40}
							height={40}
							priority
						/>
						<p className="ml-3">Would You</p>
					</div>

					<p className="text-center text-sm md:text-left">
						&copy; {new Date().getFullYear()}{" "}
						<Link
							href="https://rivo.gg/"
							target="_blank"
							className="transition-all hover:text-foreground outline-none focus-visible:text-foreground focus-visible:underline"
						>
							<b>Rivo</b>
						</Link>
						. All rights reserved.
					</p>

					{/* <StatusBadge /> */}

					<button
						type="button"
						className="gap-1 pl-0 flex flex-row items-center cursor-pointer hover:text-foreground focus-visible:text-foreground focus-visible:underline outline-none"
						// onClick={showCookieDialog}
					>
						<Settings className="size-4 mt-1" />
						Manage Cookies
					</button>

					<a
						href="https://startupfa.me/s/would-you?utm_source=wouldyoubot.gg"
						target="_blank"
						rel="noreferrer"
					>
						<Image
							src={
								theme === "light"
									? "https://startupfa.me/badges/featured-badge-small.webp"
									: "https://startupfa.me/badges/featured-badge-small-dark.webp"
							}
							alt="Would You - Entertain Your Discord Server | Startup Fame"
							width="224"
							height="36"
						/>
					</a>
				</div>

				<div className="flex w-full flex-col items-center md:items-start">
					<p className="mb-2 text-lg font-bold text-foreground">Recommended</p>
					<div className="flex flex-col items-center gap-2 md:items-start">
						{recommendedLinks.map((link) => (
							<Link
								key={link.name}
								href={link.link}
								target={link.EventTarget}
								className="transition-all hover:text-foreground focus-visible:text-foreground focus-visible:underline outline-none"
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>

				<div className="flex w-full flex-col items-center md:items-start">
					<p className="mb-2 text-lg font-bold text-foreground">Links</p>
					<div className="flex flex-col items-center gap-2 md:items-start">
						{Links.map((link) => (
							<Link
								key={link.name}
								href={link.link}
								target={link.EventTarget}
								className="transition-all hover:text-foreground focus-visible:text-foreground focus-visible:underline outline-none"
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>

				<div className="flex w-full flex-col items-center md:items-start">
					<p className="mb-2 text-lg font-bold text-foreground">Legal</p>
					<div className="flex flex-col items-center gap-2 md:items-start">
						{LegalLinks.map((link) => (
							<Link
								key={link.name}
								href={link.link}
								target={link.EventTarget}
								className="transition-all hover:text-foreground focus-visible:text-foreground focus-visible:underline outline-none"
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			</div>

			<div>
				<hr className="border border-border" />
				<p className="mt-8 text-center text-sm text-muted-foreground">
					Made with <span className="text-secondary">♥</span> by{" "}
					<Link
						href="/team"
						className="underline hover:text-foreground focus-visible:text-foreground outline-none transition-all"
					>
						Would You Team
					</Link>{" "}
					&{" "}
					<Link
						href="https://github.com/Would-You-Bot/website-app/graphs/contributors"
						target="_blank"
						className="underline hover:text-foreground focus-visible:text-foreground outline-none transition-all"
					>
						Contributors
					</Link>
				</p>
			</div>
		</footer>
	);
}
