import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type FeaturedServer from "@/types/FeaturedServer";
import {
	DiscordPartneredIcon,
	DiscordVerifiedIcon,
} from "@/components/icons/discord";
import { useTranslations } from "next-intl";

interface AvatarGroupProps {
	avatars: FeaturedServer[];
	className?: string;
	orientation?: "horizontal" | "vertical";
}

export const AvatarGroup = ({
	avatars,
	className = "",
	orientation = "horizontal",
	...props
}: AvatarGroupProps) => {
	const t = useTranslations("home.cta.avatarGroup");

	const handleClick = () => {
		const element = document.getElementById("slider");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const isVerified = (server: FeaturedServer) =>
		server.features.includes("VERIFIED");

	const isPartnered = (server: FeaturedServer) =>
		server.features.includes("PARTNERED") && !isVerified(server);

	return (
		<div
			className={cn(
				"flex select-none",
				orientation === "vertical" ? "flex-col" : "flex-row",
				className,
			)}
			onClick={handleClick}
			{...props}
		>
			{avatars.map((avatar, index) => (
				<Tooltip key={avatar.id}>
					<TooltipTrigger
						className={cn("group", index > 0 && `-ml-3 z-[${index}]`)}
					>
						<Avatar
							className={cn(
								"border-[2px] border-background bg-background group-hover:scale-105 group-hover:z-50 transition-all size-10",
							)}
						>
							<AvatarImage
								src={avatar.iconURL}
								alt={t("server.alt", { server: avatar.name })}
							/>
							<AvatarFallback>
								<Image
									src="https://cdn.discordapp.com/embed/avatars/0.png"
									alt={t("fallback.alt")}
									width={512}
									height={512}
								/>
							</AvatarFallback>
						</Avatar>
					</TooltipTrigger>
					<TooltipContent>
						<div className="flex flex-col">
							<div className="flex gap-2">
								<span className="max-w-[150px] truncate">{avatar.name}</span>
								{isVerified(avatar) && <DiscordVerifiedIcon />}
								{isPartnered(avatar) && <DiscordPartneredIcon />}
							</div>
							<span className="text-muted-foreground">
								{t("server.memberCount", {
									count: avatar.memberCount,
								})}
							</span>
						</div>
					</TooltipContent>
				</Tooltip>
			))}
			<Tooltip>
				<TooltipTrigger className="group">
					<Avatar
						className={cn(
							"border-[2px] border-background bg-background -ml-3 z-10 group-hover:scale-105 group-hover:z-50 transition-all size-10",
						)}
					>
						<AvatarImage src="" />
						<AvatarFallback className="bg-primary">
							<span className="text-sm">{t("server.additional.text")}</span>
						</AvatarFallback>
					</Avatar>
				</TooltipTrigger>
				<TooltipContent>
					<p>{t("server.additional.tooltip")}</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};

AvatarGroup.displayName = "AvatarGroup";
