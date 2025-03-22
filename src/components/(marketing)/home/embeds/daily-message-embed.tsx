"use client";

import profiles from "@/data/profiles.json";
import {
	DiscordEmbed,
	DiscordEmbedDescription,
	DiscordEmbedFooter,
	DiscordMention,
	DiscordMessage,
	DiscordMessages,
	DiscordThread,
	DiscordThreadMessage
} from "@skyra/discord-components-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MainProps {
	threadName: string;
}

const staff = Object.keys(profiles).slice(1);

export default function DailyMessageEmbed({ threadName }: MainProps) {
	const t = useTranslations("home");
	const { theme } = useTheme();
	const [randomStaff, setRandomStaff] = useState<(typeof profiles)["wouldyou"]>(
		profiles.wouldyou
	);

	// Generates a random staff member on mount
	useEffect(() => {
		setRandomStaff(
			profiles[
				staff[Math.floor(Math.random() * staff.length)] as keyof typeof profiles
			]
		);
	}, []);

	return (
		<DiscordMessages
			lightTheme={theme === "light"}
			className="min-w-fit overflow-x-hidden rounded-lg py-4 shadow"
		>
			<DiscordMessage
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
				className="px-4 py-1"
			>
				<DiscordMention
					type="role"
					color="#1e99"
				>
					{t("features.daily.embed.mention")}
				</DiscordMention>
				<DiscordEmbed
					slot="embeds"
					color="#1e88e5"
				>
					<DiscordEmbedDescription slot="description">
						{t("features.daily.embed.description")}
					</DiscordEmbedDescription>
					<DiscordEmbedFooter
						slot="footer"
						className="-mb-2 mt-2"
					>
						{t("features.daily.embed.footer")}
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordThread
					slot="thread"
					name={threadName}
					lightTheme={theme === "light"}
					className="mt-2 p-2"
				>
					<DiscordThreadMessage
						profile={randomStaff.author}
						author={randomStaff.author}
						avatar={randomStaff.avatar}
						roleColor={randomStaff.roleColor}
					>
						{t("features.daily.embed.thread.message")}
					</DiscordThreadMessage>
				</DiscordThread>
			</DiscordMessage>
		</DiscordMessages>
	);
}
