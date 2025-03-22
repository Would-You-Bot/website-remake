"use client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import DiscordIcon from "../icons/discord";
interface DiscordLoginButtonProps {
	className?: string;
	redirect?: string;
}

export default function DiscordLoginButton({
	className,
	redirect
}: DiscordLoginButtonProps) {
	const t = useTranslations("discordBtn.login");
	const pathname = usePathname();
	return (
		<>
			<a
				href={`/login?redirect=${encodeURIComponent(redirect ?? pathname)}&prompt=yes`}
				className={cn(
					"flex min-w-fit items-center justify-center gap-2 bg-discord-brand px-4 py-2 text-white leading-loose transition-all duration-300 hover:bg-discord-brand/80",
					className
				)}
			>
				<span className="hidden lg:flex">{t("long")}</span>
				<span className="flex lg:hidden">{t("short")}</span>
				<DiscordIcon className="h-6 w-6" />
			</a>
		</>
	);
}
