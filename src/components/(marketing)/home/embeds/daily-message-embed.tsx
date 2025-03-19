"use client";

import {
	DiscordEmbed,
	DiscordEmbedDescription,
	DiscordEmbedFooter,
	DiscordMention,
	DiscordMessage,
	DiscordMessages,
	DiscordThread,
	DiscordThreadMessage,
} from "@skyra/discord-components-react";
import profiles from "@/data/profiles.json";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MainProps {
	threadName: string;
}

const staff = Object.keys(profiles).slice(1);

export default function DailyMessageEmbed({ threadName }: MainProps) {
	const { theme } = useTheme();
	const [randomStaff, setRandomStaff] = useState<(typeof profiles)["wouldyou"]>(
		profiles.wouldyou,
	);

	// Generates a random staff member on mount
	useEffect(() => {
		setRandomStaff(
			profiles[
				staff[Math.floor(Math.random() * staff.length)] as keyof typeof profiles
			],
		);
	}, []);

	return (
		<DiscordMessages
			lightTheme={theme === "light"}
			className="min-w-fit overflow-x-hidden rounded-lg shadow p-4"
		>
			<DiscordMessage
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
				className="after:-ml-5"
			>
				<DiscordMention type="role" color="#1e99">
					QOTD
				</DiscordMention>
				<DiscordEmbed slot="embeds" color="#1e88e5">
					<DiscordEmbedDescription slot="description">
						Would you rather be able to control fire 🔥 or water 💧?
					</DiscordEmbedDescription>
					<DiscordEmbedFooter slot="footer" className="mt-2 -mb-2">
						Daily Message | Type: Mixed | ID: 34
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
						Wow that...
					</DiscordThreadMessage>
				</DiscordThread>
			</DiscordMessage>
		</DiscordMessages>
	);
}
