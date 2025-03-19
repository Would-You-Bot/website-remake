"use client";
import {
	DiscordActionRow,
	DiscordAttachments,
	DiscordButton,
	DiscordCommand,
	DiscordEmbed,
	DiscordEmbedDescription,
	DiscordEmbedFooter,
	DiscordMessage,
	DiscordMessages,
	DiscordReply,
} from "@skyra/discord-components-react";
import profiles from "@/data/profiles.json";
import { useTheme } from "next-themes";

interface MainProps {
	currentDate: string;
}

export default function HigherLowerEmbed({ currentDate }: MainProps) {
	const { theme } = useTheme();
	return (
		<DiscordMessages
			lightTheme={theme === "light"}
			className="overflow-x-hidden rounded-lg shadow"
		>
			<DiscordMessage
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
			>
				<DiscordCommand
					slot="reply"
					profile="Woofer21"
					author={profiles.woofer.author}
					avatar={profiles.woofer.avatar}
					roleColor={profiles.woofer.roleColor}
					command="/higherlower"
					lightTheme={theme === "light"}
				/>
				<DiscordEmbed slot="embeds" color="#57f389" image="/higherlower.webp">
					<DiscordEmbedDescription slot="description">
						Do you think that <b>Mcdonalds </b>
						has higher or lower searches than <b>Wrestling</b>?
					</DiscordEmbedDescription>
					<DiscordEmbedFooter
						timestamp={currentDate}
						slot="footer"
						footerImage="/staff/woofer21.webp"
					>
						Woofer21 | Game ID: 32c7b7c4-6e6a
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordAttachments slot="components">
					<DiscordActionRow>
						<DiscordButton type="success">Higher</DiscordButton>
						<DiscordButton type="destructive">Lower</DiscordButton>
					</DiscordActionRow>
				</DiscordAttachments>
			</DiscordMessage>

			<DiscordMessage
				profile="paulos"
				author={profiles.paulos.author}
				avatar={profiles.paulos.avatar}
				roleColor={profiles.paulos.roleColor}
				lightTheme={theme === "light"}
			>
				<DiscordReply
					slot="reply"
					profile="wouldyou"
					author={profiles.wouldyou.author}
					avatar={profiles.wouldyou.avatar}
					roleColor={profiles.wouldyou.roleColor}
					bot={profiles.wouldyou.bot}
					verified={profiles.wouldyou.verified}
					lightTheme={theme === "light"}
				>
					<p style={{ whiteSpace: "initial" }}>Click to see command</p>
				</DiscordReply>
				McDonalds probably has a lot more
			</DiscordMessage>

			<DiscordMessage
				profile="dominik"
				author={profiles.dominik.author}
				avatar={profiles.dominik.avatar}
				roleColor={profiles.dominik.roleColor}
				lightTheme={theme === "light"}
			>
				Yep should be McDonalds
			</DiscordMessage>

			<DiscordMessage
				profile="tee"
				author={profiles.tee.author}
				avatar={profiles.tee.avatar}
				roleColor={profiles.tee.roleColor}
				lightTheme={theme === "light"}
			>
				<DiscordReply
					slot="reply"
					profile="dominik"
					author={profiles.dominik.author}
					avatar={profiles.dominik.avatar}
					roleColor={profiles.dominik.roleColor}
					lightTheme={theme === "light"}
				>
					<p style={{ whiteSpace: "initial" }}>Yep should be McDonalds</p>
				</DiscordReply>
				Soooo, we gonna press higher?
			</DiscordMessage>

			<DiscordMessage
				profile="invalid"
				author={profiles.invalid.author}
				avatar={profiles.invalid.avatar}
				roleColor={profiles.invalid.roleColor}
				bot={profiles.invalid.bot}
				verified={profiles.invalid.verified}
				lightTheme={theme === "light"}
			>
				Yep!
			</DiscordMessage>
		</DiscordMessages>
	);
}
