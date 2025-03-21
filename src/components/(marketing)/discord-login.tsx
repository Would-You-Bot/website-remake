"use client";
import { usePathname } from "next/navigation";
import DiscordIcon from "../icons/discord";
import { useTranslations } from "next-intl";
interface DiscordLoginButtonProps {
	className?: string;
	redirect?: string;
}

export default function DiscordLoginButton({
	className,
	redirect,
}: DiscordLoginButtonProps) {
	const t = useTranslations("discordBtn.login");
	const pathname = usePathname();
	return (
		<>
			<a
				href={`/login?redirect=${encodeURIComponent(redirect ?? pathname)}&prompt=yes`}
				className={`flex min-w-fit items-center justify-center gap-2 bg-discord-brand px-4 py-2 leading-loose text-white transition-all duration-300 hover:bg-discord-brand/80 ${className}`}
			>
				<span className="hidden lg:flex">{t("long")}</span>
				<span className="flex lg:hidden">{t("short")}</span>
				<DiscordIcon className="h-6 w-6" />
			</a>
		</>
	);
}
