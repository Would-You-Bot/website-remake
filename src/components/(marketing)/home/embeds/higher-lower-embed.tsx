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
import { useTranslations } from "next-intl";

interface MainProps {
	currentDate: string;
}

export default function HigherLowerEmbed({ currentDate }: MainProps) {
	const t = useTranslations("home");
	const { theme } = useTheme();

	return (
		<DiscordMessages
			lightTheme={theme === "light"}
			className="overflow-x-hidden rounded-lg shadow p-4 gap-4 flex flex-col"
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
					command={t("features.higherOrLower.embed.command")}
					lightTheme={theme === "light"}
					className="mb-2 ml-12 pl-2"
				/>
				<DiscordEmbed
					slot="embeds"
					color="#57f389"
					image="/images/higherlower.webp"
				>
					<DiscordEmbedDescription slot="description">
						{t.rich("features.higherOrLower.embed.description", {
							b: (content) => <b>{content}</b>,
						})}
					</DiscordEmbedDescription>
					<DiscordEmbedFooter
						timestamp={currentDate}
						slot="footer"
						footerImage="/staff/woofer21.webp"
						className="mt-2 -mb-2"
					>
						{t("discordEmbed.footer", {
							author: profiles.woofer.author,
							type: "Higher or Lower",
							id: "32",
						})}
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordAttachments slot="components">
					<DiscordActionRow>
						<DiscordButton type="success">
							{t("features.higherOrLower.embed.btns.higher")}
						</DiscordButton>
						<DiscordButton type="destructive">
							{t("features.higherOrLower.embed.btns.lower")}
						</DiscordButton>
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
					className="mb-2 ml-12 pl-2"
				>
					<p style={{ whiteSpace: "initial" }}>
						{t("features.higherOrLower.embed.reply.click")}
					</p>
				</DiscordReply>
				{t("features.higherOrLower.embed.reply.1")}
			</DiscordMessage>

			<DiscordMessage
				profile="dominik"
				author={profiles.dominik.author}
				avatar={profiles.dominik.avatar}
				roleColor={profiles.dominik.roleColor}
				lightTheme={theme === "light"}
			>
				{t("features.higherOrLower.embed.reply.2")}
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
					className="mb-2 ml-12 pl-2"
				>
					<p style={{ whiteSpace: "initial" }}>
						{t("features.higherOrLower.embed.reply.2")}
					</p>
				</DiscordReply>
				{t("features.higherOrLower.embed.reply.3")}
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
				{t("features.higherOrLower.embed.reply.4")}
			</DiscordMessage>
		</DiscordMessages>
	);
}
