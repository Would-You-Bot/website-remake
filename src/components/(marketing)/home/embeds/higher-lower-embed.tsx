"use client";
import profiles from "@/data/profiles.json";
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
	DiscordReply
} from "@skyra/discord-components-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

interface MainProps {
	currentDate: string;
}

export default function HigherLowerEmbed({ currentDate }: MainProps) {
	const t = useTranslations("home");
	const { theme } = useTheme();

	return (
		<DiscordMessages
			lightTheme={theme === "light"}
			className="flex flex-col gap-4 overflow-x-hidden rounded-lg py-4 shadow"
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
				<DiscordCommand
					slot="reply"
					profile="Woofer21"
					author={profiles.woofer.author}
					avatar={profiles.woofer.avatar}
					roleColor={profiles.woofer.roleColor}
					command={t("features.higherOrLower.embed.command")}
					lightTheme={theme === "light"}
					className="mb-1 ml-[3.5rem] pl-2"
				/>
				<DiscordEmbed
					slot="embeds"
					color="#57f389"
					image="/images/higherlower.webp"
				>
					<DiscordEmbedDescription slot="description">
						{t.rich("features.higherOrLower.embed.description", {
							b: (content) => <b>{content}</b>
						})}
					</DiscordEmbedDescription>
					<DiscordEmbedFooter
						timestamp={currentDate}
						slot="footer"
						footerImage="/staff/woofer21.webp"
						className="-mb-2 mt-2"
					>
						{t("discordEmbed.footer", {
							author: profiles.woofer.author,
							type: "Higher or Lower",
							id: "32"
						})}
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordAttachments
					slot="components"
					className="mt-1"
				>
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
				className="px-4 py-1 hover:bg-black/5"
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
					className="mb-1 ml-[3.5rem] pl-2"
				>
					{t("features.higherOrLower.embed.reply.click")}
				</DiscordReply>
				{t("features.higherOrLower.embed.reply.1")}
			</DiscordMessage>

			<DiscordMessage
				profile="dominik"
				author={profiles.dominik.author}
				avatar={profiles.dominik.avatar}
				roleColor={profiles.dominik.roleColor}
				lightTheme={theme === "light"}
				className="px-4 py-1 hover:bg-black/5"
			>
				{t("features.higherOrLower.embed.reply.2")}
			</DiscordMessage>

			<DiscordMessage
				profile="tee"
				author={profiles.tee.author}
				avatar={profiles.tee.avatar}
				roleColor={profiles.tee.roleColor}
				lightTheme={theme === "light"}
				className="px-4 py-1 hover:bg-black/5"
			>
				<DiscordReply
					slot="reply"
					profile="dominik"
					author={profiles.dominik.author}
					avatar={profiles.dominik.avatar}
					roleColor={profiles.dominik.roleColor}
					lightTheme={theme === "light"}
					className="mb-1 ml-[3.5rem] pl-2"
				>
					{t("features.higherOrLower.embed.reply.2")}
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
				className="px-4 py-1 hover:bg-black/5"
			>
				{t("features.higherOrLower.embed.reply.4")}
			</DiscordMessage>
		</DiscordMessages>
	);
}
