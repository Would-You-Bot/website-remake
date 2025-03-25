import { env } from "@/env";
import prisma from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql"
	}),
	socialProviders: {
		discord: {
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
			disableDefaultScope: true,
			scope: ["identify", "guilds"],
			mapProfileToUser: (profile) => {
				return {
					name: profile.global_name || profile.username,
					email: "hello@wouldyoubot.gg",
					image: profile.avatar || undefined,
					banner: profile.banner || undefined
				};
			}
		}
	}
});
