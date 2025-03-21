import Marquee from "react-fast-marquee";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, type FC } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import {
	DiscordPartneredIcon,
	DiscordVerifiedIcon,
} from "@/components/icons/discord";
import { useTranslations } from "next-intl";

interface Server {
	id: string;
	name: string;
	memberCount: number;
	iconURL: string;
	vanityURLCode: string;
	features: string[];
}

interface MarqueeProps {
	servers: Server[];
	speed: number;
	direction?: "left" | "right";
	className?: string;
}

const ServerMarquee: FC<MarqueeProps> = ({
	servers,
	speed,
	direction,
	className,
}) => {
	const t = useTranslations("home.servers.marquee");
	const { theme } = useTheme();

	const isVerified = (server: Server) => server.features.includes("VERIFIED");

	const isPartnered = (server: Server) =>
		server.features.includes("PARTNERED") && !isVerified(server);

	return (
		<div
			className={cn(
				"relative mx-auto my-auto mt-8 max-w-7xl overflow-hidden",
				className,
			)}
		>
			<Marquee
				className="flex w-max items-center overflow-hidden"
				play
				speed={speed}
				direction={direction ?? "left"}
				gradient={true}
				gradientColor={theme === "light" ? "var(--popover)" : "var(--popover)"}
			>
				{servers.map((s: Server) => (
					<Link
						className="mr-4 flex w-72 cursor-pointer items-center gap-4 rounded-lg bg-background p-4 transition-all hover:bg-background/80"
						key={s.id}
						href={`https://discord.gg/${s.vanityURLCode}`}
						target="_blank"
					>
						<Avatar
							src={s.iconURL}
							alt={t("iconAlt", { server: s.name })}
							fallbackSrc="/logo.svg"
							width={60}
							height={60}
							className="rounded-lg"
						/>
						<div>
							<div className="relative flex items-center">
								{isVerified(s) && <DiscordVerifiedIcon />}
								{isPartnered(s) && <DiscordPartneredIcon />}
								<h4 className="ml-2 max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-lg text-foreground">
									{s.name}
								</h4>
							</div>
							<p className="text-left text-sm text-foreground/60">
								{t("members", { count: s.memberCount })}
							</p>
						</div>
					</Link>
				))}
			</Marquee>
		</div>
	);
};

export default ServerMarquee;

interface AvatarProps {
	fallbackSrc: string;
	src: string;
	alt: string;
}

const Avatar = ({
	fallbackSrc,
	src,
	alt,
	...props
}: AvatarProps & ImageProps) => {
	const [srcState, setSrcState] = useState(src);

	return (
		<Image
			onError={() => setSrcState(fallbackSrc)}
			alt={alt}
			draggable={false}
			src={srcState}
			{...props}
		/>
	);
};
