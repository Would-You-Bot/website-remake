"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations();
	const { theme } = useTheme();

	const recommendedLinks = [
		{
			name: t("footer.recommended.home"),
			link: "/",
			EventTarget: "_self",
		},
		{
			name: t("footer.recommended.commands"),
			link: "/commands",
			EventTarget: "_self",
		},
		{
			name: t("footer.recommended.team"),
			link: "/team",
			EventTarget: "_self",
		},
		{
			name: t("footer.recommended.reddit"),
			link: "/reddit",
			EventTarget: "_blank",
		},
	];

	const Links = [
		{
			name: t("footer.links.support"),
			link: "/discord",
			EventTarget: "_blank",
		},
		{
			name: t("footer.links.invite"),
			link: "/invite",
			EventTarget: "_blank",
		},
		{
			name: t("footer.links.status"),
			link: "/status",
			EventTarget: "_self",
		},
	];

	const LegalLinks = [
		{
			name: t("footer.legal.legal"),
			link: "/legal",
			EventTarget: "_self",
		},
		{
			name: t("footer.legal.privacy"),
			link: "/privacy",
			EventTarget: "_self",
		},
		{
			name: t("footer.legal.terms"),
			link: "/terms",
			EventTarget: "_self",
		},
		{
			name: t("footer.legal.refund"),
			link: "/refunds",
			EventTarget: "_self",
		},
	];

	return (
		<footer className="mt-20 mx-auto w-full max-w-8xl px-8 py-8">
			<div className="mb-8 flex flex-col justify-between gap-4 text-muted-foreground md:flex-row">
				<div className="flex w-full flex-col items-center md:mr-4 md:items-start gap-3">
					<div className="flex items-center text-xl font-bold text-foreground">
						<Image
							src="/Logo.svg"
							alt={t("brand.logo.alt")}
							className="rounded-full"
							width={40}
							height={40}
							priority
						/>
						<p className="ml-3">{t("brand.name")}</p>
					</div>

					<p className="text-center text-sm md:text-left">
						{t.rich("footer.legal.copyright", {
							date: new Date(),
							link: (content) => (
								<Link
									href="https://rivo.gg/"
									target="_blank"
									className="transition-all font-bold hover:text-foreground outline-none focus-visible:text-foreground focus-visible:underline"
								>
									{content}
								</Link>
							),
						})}
					</p>

					{/* <StatusBadge /> */}

					<button
						type="button"
						className="gap-1 pl-0 flex flex-row items-center cursor-pointer hover:text-foreground focus-visible:text-foreground focus-visible:underline outline-none"
						// onClick={showCookieDialog}
					>
						<Settings className="size-4 mt-1" />
						{t("footer.btns.cookie")}
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
							alt={t("footer.btns.startup.alt")}
							width="224"
							height="36"
						/>
					</a>
				</div>

				<div className="flex w-full flex-col items-center md:items-start">
					<p className="mb-2 text-lg font-bold text-foreground">
						{t("footer.recommended.title")}
					</p>
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
					<p className="mb-2 text-lg font-bold text-foreground">
						{t("footer.links.title")}
					</p>
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
					<p className="mb-2 text-lg font-bold text-foreground">
						{t("footer.legal.title")}
					</p>
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
					{t.rich("footer.love", {
						secondary: (content) => (
							<span className="text-secondary">{content}</span>
						),
						teamLink: (content) => (
							<Link
								href="/team"
								className="underline hover:text-foreground focus-visible:text-foreground outline-none transition-all"
							>
								{content}
							</Link>
						),
						contribLink: (content) => (
							<Link
								href="https://github.com/Would-You-Bot/website-app/graphs/contributors"
								target="_blank"
								className="underline hover:text-foreground focus-visible:text-foreground outline-none transition-all"
							>
								{content}
							</Link>
						),
					})}
				</p>
			</div>
		</footer>
	);
}
