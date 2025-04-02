import { env } from "@/env";
import { setUserLocale } from "@/i18n/services/locale";
import prisma from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware, getSessionFromCtx } from "better-auth/api";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql"
	}),
	trustedOrigins: [env.BETTER_AUTH_URL],
	user: {
		deleteUser: {
			enabled: true
		},
		additionalFields: {
			locale: {
				type: "string",
				default: "en"
			}
		}
	},
	socialProviders: {
		discord: {
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
			disableDefaultScope: true,
			scope: ["identify", "guilds"],
			mapProfileToUser: (profile) => {
				return {
					name: profile.global_name || profile.username,
					email: `discord-social-${profile.id}@wouldyoubot.gg`,
					image: profile.avatar
						? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${profile.avatar.startsWith("a") ? "gif" : "webp"}`
						: undefined,
					banner: profile.banner
						? `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${profile.banner.startsWith("a") ? "gif" : "webp"}`
						: undefined,
					emailVerified: profile.verified,
					locale: "en"
				};
			}
		}
	},
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			const session = await getSessionFromCtx(ctx);

			await setUserLocale(session?.user.locale);
		})
	}
});
