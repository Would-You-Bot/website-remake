import { SchemaMetadata } from "@/components/(marketing)/home/schema-metadata";
import { env } from "@/env";
import type FeaturedServer from "@/types/featured-server";
import axios from "axios";
import Content from "./content";

export default async function Home() {
	const serverCount = (
		await axios.get<{
			data: { bot: { approximate_guild_count: number } };
		}>("https://japi.rest/discord/v1/application/981649513427111957/")
	).data.data.bot.approximate_guild_count;

	const serverData = await axios
		.get<{ result: string }>(env.UPSTASH_URL, {
			headers: {
				Authorization: `Bearer ${env.UPSTASH_API_KEY}`
			}
		})
		.catch(() => ({ data: { result: "[]" } }));
	const servers = JSON.parse(serverData.data.result);

	return (
		<main
			className="flex w-full flex-col items-center overflow-x-hidden"
			tabIndex={-1}
		>
			<Content
				serverCount={serverCount}
				servers={servers.filter((n: FeaturedServer) => n.name !== "Pornhub")}
			/>
			<SchemaMetadata />
		</main>
	);
}
