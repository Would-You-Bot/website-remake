"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Crown, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { type PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger
} from "../ui/dropdown-menu";
import DiscordLoginButton from "./discord-login";
import LanguageSwitcher from "./language-switcher";
import ThemeSwitcher from "./theme-switcher";

export default function Navbar() {
	const t = useTranslations("brand");
	const [isOpen, setIsOpen] = useState(false);
	const { data: session, isPending } = authClient.useSession();

	const handleIsOpen = () => {
		if (window.innerWidth < 1024) {
			setIsOpen(!isOpen);
		}
	};

	return (
		<nav className="sticky top-1 left-0 z-50 mb-8 flex h-auto w-full items-center justify-center py-6">
			<div className="flex w-full max-w-8xl items-center justify-between px-8 transition-all duration-300">
				<NavSection className="px-6">
					<Link
						href={"/"}
						className="flex items-center gap-4 xs:gap-6 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-8 focus-visible:ring-offset-background"
					>
						<Image
							src="/Logo.svg"
							alt={t("logo.alt")}
							width={30}
							height={30}
							className="rounded-full"
							priority
						/>
						<p className="whitespace-nowrap font-bold text-xl">{t("name")}</p>
					</Link>
				</NavSection>

				<NavSection
					className={clsx(
						"absolute top-6 right-7 w-16 lg:static lg:w-min",
						isOpen && "top-0 right-0 z-10 h-screen w-screen rounded-none"
					)}
				>
					<ul className="hidden w-max items-center gap-6 px-2 decoration-transparent lg:flex">
						<NavList />
					</ul>

					<button
						type="button"
						title={`${isOpen ? "close" : "open"} menu`}
						className="absolute top-[1.45rem] right-[1.15rem] z-50 flex cursor-pointer flex-col gap-[5px] lg:hidden"
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
							"pointer-events-none mb-auto flex h-full w-full scale-125 flex-col items-center justify-center gap-8 p-4 opacity-0 transition-all duration-300 lg:hidden",
							isOpen && "pointer-events-auto bg-background/70 opacity-100"
						)}
					>
						{session || isPending ? <></> : <NavDropdown />}
						<NavList />
						<DiscordLoginButton className="h-12 rounded-md px-6" />
					</ul>
				</NavSection>

				<NavSection className="hidden gap-2 p-2 lg:flex">
					{session || isPending ? <></> : <NavDropdown />}
					<DiscordLoginButton className="h-12 rounded-md px-6" />
				</NavSection>
			</div>
		</nav>
	);
}

function NavSection({
	children,
	className
}: PropsWithChildren<{ className?: string }>) {
	return (
		<div
			className={cn(
				clsx(
					"flex h-16 items-center justify-center gap-4 rounded-2xl border border-border bg-background/50 px-4 xs:px-6 backdrop-blur-md transition-all duration-300",
					className
				)
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
	isPremium = false
}: PropsWithChildren<{
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
						"font-semibold text-foreground text-lg outline-none transition-all hover:text-muted-foreground focus-visible:text-muted-foreground focus-visible:underline",
						isPremium &&
							"-mx-3 rounded-md bg-premium/5 px-3 py-1.5 text-premium hover:bg-premium/[2.5%] hover:text-premium/70 focus-visible:bg-premium/[2.5%] focus-visible:text-premium/70",
						className
					)
				)}
			>
				{children}
			</Link>
		</li>
	);
}

function NavDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="cursor-pointer"
				asChild
			>
				<Button
					variant="ghost"
					size="icon"
					className="size-12"
				>
					<Menu className="size-6" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<ThemeSwitcher />
					<LanguageSwitcher />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
