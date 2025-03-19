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
import { getRandomQuestion, QuestionTypes } from "@/helpers/getRandomQuestion";
import profiles from "@/data/profiles.json";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { CheckEmoji, CrossEmoji } from "@/components/icons/emoji";

type MessageType = "vote" | "results" | null;

const staff = Object.keys(profiles).slice(1);

export default function NeverHaveIEverEmbed() {
	const { theme } = useTheme();
	const [haveDone, setHaveDone] = useState<boolean | null>(null);
	const [messageType, setMessageType] = useState<MessageType>(null);
	const [replayedRounds, setReplayedRounds] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(
		getRandomQuestion(QuestionTypes.NHIE),
	);
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

	const replay = () => {
		if (replayedRounds < 3) {
			setMessageType(null);
			setHaveDone(null);
			setCurrentQuestion(getRandomQuestion(QuestionTypes.NHIE));
			setReplayedRounds(replayedRounds + 1);
		}
	};

	return (
		<DiscordMessages
			lightTheme={theme === "light"}
			className="overflow-x-hidden rounded-lg text-left shadow p-4 flex flex-col gap-4"
		>
			<DiscordMessage
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
				edited={replayedRounds > 0}
			>
				<DiscordCommand
					slot="reply"
					profile={randomStaff.author}
					author={randomStaff.author}
					avatar={randomStaff.avatar}
					roleColor={randomStaff.roleColor}
					command="/neverhaveiever"
					className="mb-2 ml-12 pl-2"
				/>
				<DiscordEmbed slot="embeds" color="#1e88e5">
					<DiscordEmbedDescription slot="description">
						{currentQuestion}
					</DiscordEmbedDescription>
					<DiscordEmbedFooter
						slot="footer"
						footerImage={randomStaff.avatar}
						className="mt-2 -mb-2"
					>
						Requested by {randomStaff.author} | Type: NHIE | ID: 124
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordAttachments slot="components">
					<DiscordActionRow>
						<DiscordButton
							type="secondary"
							onClick={() => setMessageType("results")}
						>
							Results
						</DiscordButton>
						<DiscordButton
							type="primary"
							onClick={() => {
								setHaveDone(true);
								setMessageType("vote");
							}}
						>
							<CheckEmoji />
						</DiscordButton>
						<DiscordButton
							type="primary"
							onClick={() => {
								setHaveDone(false);
								setMessageType("vote");
							}}
						>
							<CrossEmoji />
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
								New Question
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
								Invite Would You
							</DiscordButton>
						)}
					</DiscordActionRow>
				</DiscordAttachments>
			</DiscordMessage>
			<DiscordMessage
				className={`${messageType === "vote" ? "mb-2" : "hidden"} pl-4`}
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
				dismissMessageClicked={() => setMessageType(null)}
				ephemeral
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
					command={true}
					className="mb-2 ml-12 pl-2"
				>
					<p style={{ whiteSpace: "initial" }}>Click to see command</p>
				</DiscordReply>
				<p>
					You&apos;ve voted that you{" "}
					<span className="font-bold">
						{haveDone ? "have" : "have not"} done it
					</span>
					.
				</p>
			</DiscordMessage>
			<DiscordMessage
				className={`${messageType === "results" ? "" : "hidden"} pl-4`}
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
				dismissMessageClicked={() => setMessageType(null)}
				ephemeral
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
					command={true}
					className="mb-2 ml-12 pl-2"
				>
					<p style={{ whiteSpace: "initial" }}>Click to see command</p>
				</DiscordReply>
				<DiscordEmbed
					slot="embeds"
					color={haveDone ? "#0091ff" : "#f00404"}
					image={
						haveDone == null
							? "/images/nhie-chart-50-50.webp"
							: haveDone
								? "/images/nhie-chart-100-have.webp"
								: "/images/nhie-chart-100-not.webp"
					}
				>
					<DiscordEmbedFooter
						slot="footer"
						footerImage={profiles.wouldyou.avatar}
						className="mt-2 -mb-2"
					>
						{profiles.wouldyou.author} | Page 1/2
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordAttachments slot="components">
					<DiscordActionRow>
						<DiscordButton
							type="secondary"
							onClick={() =>
								window.open("https://wouldyoubot.gg/invite", "_blank")
							}
							emoji="/emojis/external.svg"
							emojiName="external"
						>
							Invite Would You
						</DiscordButton>
					</DiscordActionRow>
				</DiscordAttachments>
			</DiscordMessage>
		</DiscordMessages>
	);
}
