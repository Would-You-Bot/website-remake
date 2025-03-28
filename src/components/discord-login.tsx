import { setUserLocale } from "@/i18n/services/locale";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
	CreditCard,
	Languages,
	LogOut,
	Settings,
	ShieldUser,
	User
} from "lucide-react";
import { type Locale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Flag from "react-world-flags";
import DiscordIcon from "./icons/discord";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

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

	const handleLocaleChange = (value: string) => {
		setUserLocale(value as Locale);
		authClient.updateUser({
			locale: value
		});
	};

	if (session) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
					<Avatar>
						<AvatarImage
							className="h-8 w-8"
							src={session.user.image || ""}
						/>
						<AvatarFallback>{t("nav.profile.avatar.fallback")}</AvatarFallback>
					</Avatar>
					{session.user.name}
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
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<Languages className="size-4 text-muted-foreground" />
								{t("nav.profile.dropdown.account.language")}
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuRadioGroup
									value={session.user.locale}
									onValueChange={(value) => handleLocaleChange(value)}
								>
									<DropdownMenuRadioItem value="en">
										<Flag
											code="us"
											className="size-4"
										/>
										English
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="de">
										<Flag
											code="de"
											className="size-4"
										/>
										Deutsch
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="fr">
										<Flag
											code="fr"
											className="size-4"
										/>
										Français
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="es">
										<Flag
											code="es"
											className="size-4"
										/>
										Española
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="it">
										<Flag
											code="it"
											className="size-4"
										/>
										Italiana
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
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
