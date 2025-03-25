"use client";

import { NumberOneEmoji, NumberTwoEmoji } from "@/components/icons/emoji";
import profiles from "@/data/profiles.json";
import {
	QuestionTypes,
	getRandomQuestion
} from "@/helpers/get-random-question";
import {
	DiscordActionRow,
	DiscordAttachments,
	DiscordButton,
	DiscordCommand,
	DiscordEmbed,
	DiscordEmbedDescription,
	DiscordEmbedFooter,
	DiscordMessage,
	DiscordMessages
} from "@skyra/discord-components-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const staff = Object.keys(profiles).slice(1);

export default function MainDiscordEmbed() {
	const t = useTranslations();
	const { theme } = useTheme();
	const [replayedRounds, setReplayedRounds] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(
		getRandomQuestion(QuestionTypes.WYR)
	);
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

	const replay = () => {
		if (replayedRounds < 3) {
			setCurrentQuestion(getRandomQuestion(QuestionTypes.WYR));
			setReplayedRounds(replayedRounds + 1);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, transform: "translateY(20px)" }}
			whileInView={{ opacity: 1, transform: "translateY(0)" }}
			transition={{ duration: 0.7, ease: "easeInOut" }}
			viewport={{ once: true }}
			style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
		>
			<DiscordMessages
				lightTheme={theme === "light"}
				className="mx-auto w-auto overflow-x-hidden rounded-lg py-4 text-left shadow sm:w-2/3 lg:w-auto"
			>
				<DiscordMessage
					profile="wouldyou"
					author={profiles.wouldyou.author}
					avatar={profiles.wouldyou.avatar}
					roleColor={profiles.wouldyou.roleColor}
					bot={profiles.wouldyou.bot}
					verified={profiles.wouldyou.verified}
					edited={replayedRounds > 0}
					className="px-4 py-1 hover:bg-black/5"
				>
					<DiscordCommand
						slot="reply"
						profile={randomStaff.author}
						author={randomStaff.author}
						avatar={randomStaff.avatar}
						roleColor={randomStaff.roleColor}
						command={t("home.cta.mainEmbed.command")}
						lightTheme={theme === "light"}
						className="mb-2 ml-12 pl-2"
					/>
					<DiscordEmbed
						slot="embeds"
						color="#1e88e5"
					>
						<DiscordEmbedDescription slot="description">
							{
								//@ts-ignore -- ignoring error because unable to get the types to match.
								t(currentQuestion)
							}
						</DiscordEmbedDescription>
						<DiscordEmbedFooter
							slot="footer"
							footerImage={randomStaff.avatar}
							className="-mb-2 mt-2"
						>
							{t("home.discordEmbed.footer", {
								author: randomStaff.author,
								type: "General",
								id: "64"
							})}
						</DiscordEmbedFooter>
					</DiscordEmbed>
					<DiscordAttachments slot="components">
						<DiscordActionRow>
							<DiscordButton type="secondary">
								{t("home.discordEmbed.btns.result")}
							</DiscordButton>
							<DiscordButton type="primary">
								<NumberOneEmoji />
							</DiscordButton>
							<DiscordButton type="primary">
								<NumberTwoEmoji />
							</DiscordButton>
						</DiscordActionRow>
						<DiscordActionRow>
							{replayedRounds < 3 ? (
								<DiscordButton
									type="primary"
									onClick={() => replay()}
									emoji="/emojis/refresh.svg"
									emojiName="refresh"
								>
									{t("home.discordEmbed.btns.newQuestion")}
								</DiscordButton>
							) : (
								<DiscordButton
									type="secondary"
									onClick={() =>
										window.open("https://wouldyoubot.gg/invite", "_blank")
									}
									emoji="/emojis/external.svg"
									emojiName="external"
								>
									{t("home.discordEmbed.btns.invite")}
								</DiscordButton>
							)}
						</DiscordActionRow>
					</DiscordAttachments>
				</DiscordMessage>
			</DiscordMessages>
		</motion.div>
	);
}
