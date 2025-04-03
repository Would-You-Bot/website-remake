import DiscordIcon from "@/components/icons/discord";
import LanguageSwitcher from "@/components/nav/language-switcher";
import ThemeSwitcher from "@/components/nav/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { CreditCard, LogOut, Settings, ShieldUser, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DiscordLoginButtonProps {
	className?: string;
}

export default function DiscordLoginButton({
	className
}: DiscordLoginButtonProps) {
	const t = useTranslations();
	const { data: session, isPending } = authClient.useSession();
	const pathname = usePathname();

	const handleLogin = async () => {
		await authClient.signIn.social({
			provider: "discord",
			callbackURL: `${pathname}`
		});
	};

	if (session) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className="flex h-12 items-center gap-3 p-2 text-xl"
						variant="ghost"
					>
						<Avatar>
							<AvatarImage
								className="size-9"
								src={session.user.image || ""}
							/>
							<AvatarFallback>
								{t("nav.profile.avatar.fallback")}
							</AvatarFallback>
						</Avatar>
						<span className="pr-2 leading-0">{session.user.name}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side="bottom"
					align="end"
				>
					<DropdownMenuGroup>
						<DropdownMenuLabel>
							{t("nav.profile.dropdown.account.label")}
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<User className="size-4" />
							{t("nav.profile.dropdown.account.profile")}
						</DropdownMenuItem>

						<ThemeSwitcher />
						<LanguageSwitcher />

						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<Link
									href={"/settings"}
									className="flex w-full items-center gap-2"
								>
									<Settings className="size-4 text-muted-foreground" />
									{t("nav.profile.dropdown.account.settings.sub.title")}
								</Link>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuGroup>
									<DropdownMenuLabel>
										{t("nav.profile.dropdown.account.settings.sub.label")}
									</DropdownMenuLabel>

									<Link href={"/settings/profile"}>
										<DropdownMenuItem>
											<User className="size-4" />
											{t("nav.profile.dropdown.account.settings.sub.profile")}
										</DropdownMenuItem>
									</Link>

									<Link href={"/settings/privacy"}>
										<DropdownMenuItem>
											<ShieldUser className="size-4" />
											{t("nav.profile.dropdown.account.settings.sub.privacy")}
										</DropdownMenuItem>
									</Link>
								</DropdownMenuGroup>
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<CreditCard className="size-4" />
							{t("nav.profile.dropdown.account.manageSubscription")}
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem
							variant="destructive"
							onClick={() => authClient.signOut()}
						>
							<LogOut className="size-4" />
							{t("nav.profile.dropdown.account.logout")}
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	if (isPending) {
		return <Skeleton className="h-8 w-44 px-4 py-2" />;
	}

	return (
		<>
			<button
				type="button"
				onClick={handleLogin}
				className={cn(
					"flex min-w-fit cursor-pointer items-center justify-center gap-2 bg-discord-brand px-4 py-2 text-white leading-loose transition-all duration-300 hover:bg-discord-brand/80",
					className
				)}
			>
				<span className="hidden lg:flex">{t("discordBtn.login.long")}</span>
				<span className="flex lg:hidden">{t("discordBtn.login.short")}</span>
				<DiscordIcon className="h-6 w-6" />
			</button>
		</>
	);
}
