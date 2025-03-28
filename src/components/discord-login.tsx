import { setUserLocale } from "@/i18n/services/locale";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { type Locale, useTranslations } from "next-intl";
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
	const t = useTranslations("discordBtn.login");
	const { data: session, isPending } = authClient.useSession();
	const pathname = usePathname();

	const handleLogin = async () => {
		await authClient.signIn.social({
			provider: "discord",
			callbackURL: `${pathname}`
		});
	};

	const handleLangChange = (value: string) => {
		setUserLocale(value as Locale);
		authClient.updateUser({
			language: value
		});
	};

	if (session) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger className="cursor-pointer">
					<Avatar>
						<AvatarImage
							className="h-12 w-12"
							src={session.user.image || ""}
						/>
						<AvatarFallback>WY</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side="bottom"
					align="end"
				>
					<DropdownMenuGroup>
						<DropdownMenuLabel>Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="size-4" />
							Profile
						</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger alwaysLeft>
								Language
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuRadioGroup
									value={session.user.language}
									onValueChange={(value) => handleLangChange(value)}
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
										German
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="fr">
										<Flag
											code="fr"
											className="size-4"
										/>
										French
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="es">
										<Flag
											code="es"
											className="size-4"
										/>
										Spanish
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="it">
										<Flag
											code="it"
											className="size-4"
										/>
										Italian
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuItem>
							<Settings className="size-4" />
							Settings
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<CreditCard className="size-4" />
							Manage Subscription
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							variant="destructive"
							onClick={() => authClient.signOut()}
						>
							<LogOut className="size-4" />
							Logout
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
				<span className="hidden lg:flex">{t("long")}</span>
				<span className="flex lg:hidden">{t("short")}</span>
				<DiscordIcon className="h-6 w-6" />
			</button>
		</>
	);
}
