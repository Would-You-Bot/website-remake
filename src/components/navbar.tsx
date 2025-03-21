"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Crown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DiscordLoginButton from "./(marketing)/discord-login";
import { useTranslations } from "next-intl";

export default function Navbar() {
	const t = useTranslations("brand");
	const [isOpen, setIsOpen] = useState(false);

	const handleIsOpen = () => {
		if (window.innerWidth < 1024) setIsOpen(!isOpen);
	};

	return (
		<nav className="sticky left-0 top-1 z-50 mb-8 w-full py-6 flex h-auto items-center justify-center">
			<div className="max-w-8xl flex items-center justify-between px-8 transition-all duration-300 w-full">
				<NavSection className="px-6">
					<Link
						href={"/"}
						className="flex items-center gap-4 xs:gap-6 outline-none focus-visible:ring-2 focus-visible:ring-offset-8 focus-visible:ring-offset-background focus-visible:ring-primary rounded-sm"
					>
						<Image
							src="/logo.svg"
							alt={t("logo.alt")}
							width={30}
							height={30}
							className="rounded-full"
							priority
						/>
						<p className="text-xl font-bold">{t("name")}</p>
					</Link>
				</NavSection>

				<NavSection
					className={clsx(
						"absolute lg:static right-7 top-6 w-16 lg:w-min",
						isOpen && "right-0 top-0 z-10 h-screen w-screen rounded-none",
					)}
				>
					<ul className="hidden w-max gap-6 px-2 lg:flex items-center decoration-transparent">
						<NavList />
					</ul>

					<button
						type="button"
						title={`${isOpen ? "close" : "open"} menu`}
						className="absolute right-[1.15rem] top-[1.45rem] z-50 flex flex-col gap-[5px] lg:hidden cursor-pointer"
						onClick={handleIsOpen}
					>
						<div
							className={`h-[2px] w-[25px] rounded-[10px] bg-foreground ${isOpen ? "translate-y-[7px] rotate-45" : ""} transition-all duration-300`}
						/>
						<div
							className={`h-[2px] w-[25px] rounded-[10px] bg-foreground ${isOpen ? "opacity-0" : ""} transition-all`}
						/>
						<div
							className={`h-[2px] w-[25px] rounded-[10px] bg-foreground ${isOpen ? "-translate-y-[7px] -rotate-45" : ""} transition-all duration-300`}
						/>
					</button>

					<ul
						className={cn(
							"mb-auto flex flex-col items-center justify-center h-full w-full gap-8 p-4 lg:hidden transition-all duration-300 pointer-events-none opacity-0 scale-125",
							isOpen && "pointer-events-auto opacity-100 bg-background/70",
						)}
					>
						<ThemeToggle />
						<NavList />
						<DiscordLoginButton className="h-12 rounded-md px-6" />
					</ul>
				</NavSection>

				<NavSection className="hidden lg:flex p-2 gap-2">
					<ThemeToggle />
					<DiscordLoginButton className="h-12 rounded-md px-6" />
				</NavSection>
			</div>
		</nav>
	);
}

function NavSection({
	children,
	className,
}: React.PropsWithChildren<{ className?: string }>) {
	return (
		<div
			className={cn(
				clsx(
					"h-16 flex gap-4 items-center justify-center rounded-2xl border border-border bg-background/50 px-4 xs:px-6 backdrop-blur-md transition-all duration-300",
					className,
				),
			)}
		>
			{children}
		</div>
	);
}

function NavList() {
	const t = useTranslations("nav");

	return (
		<>
			<NavItem href="/commands">{t("commands")}</NavItem>
			<NavItem href="/blog">{t("blog")}</NavItem>
			<NavItem href="/packs">{t("questionPack")}</NavItem>
			<NavItem
				href="/premium"
				isPremium
				className="flex flex-row items-center gap-2"
			>
				<Crown className="size-4" /> {t("premium")}
			</NavItem>
		</>
	);
}

function NavItem({
	children,
	href,
	className,
	isPremium = false,
}: React.PropsWithChildren<{
	href: string;
	className?: string;
	isPremium?: boolean;
}>) {
	return (
		<li>
			<Link
				href={href}
				className={cn(
					clsx(
						"text-lg text-foreground transition-all hover:text-muted-foreground focus-visible:text-muted-foreground focus-visible:underline outline-none font-semibold",
						isPremium &&
							"text-premium hover:text-premium/70 focus-visible:text-premium/70 bg-premium/5 focus-visible:bg-premium/[2.5%] hover:bg-premium/[2.5%] py-1.5 px-3 rounded-md -mx-3",
						className,
					),
				)}
			>
				{children}
			</Link>
		</li>
	);
}

function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<button
			type="button"
			className="flex p-2 aspect-square cursor-pointer rounded-xl items-center justify-center text-muted-foreground hover:text-foreground transition"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
		>
			{theme === "light" ? (
				<Moon className="w-6 h-6 sm:w-7 sm:h-7" />
			) : (
				<Sun className="w-6 h-6 sm:w-7 sm:h-7" />
			)}
		</button>
	);
}
