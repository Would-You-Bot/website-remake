import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID || "",
			clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
			disableDefaultScope: true,
			scope: ["identify", "guilds"],
			mapProfileToUser: (profile) => {
				return {
					name: profile.global_name || profile.username,
					email: "hello@wouldyoubot.gg",
					image: profile.avatar || undefined,
					banner: profile.banner || undefined,
				};
			},
		},
	},
});
