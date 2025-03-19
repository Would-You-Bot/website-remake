import type FeaturedServer from "@/types/FeaturedServer";
import axios from "axios";
import Content from "./content";

export default async function Home() {
	const serverCount = (
		await axios.get<{
			data: { bot: { approximate_guild_count: number } };
		}>("https://japi.rest/discord/v1/application/981649513427111957/")
	).data.data.bot.approximate_guild_count;

	const serverData = await axios.get<{ result: string }>(
		"https://liberal-snail-47202.upstash.io/get/server_count",
		{
			headers: {
				Authorization: `Bearer ${process.env.UPSTASH_API_KEY}`,
			},
		},
	);
	const servers = JSON.parse(serverData.data.result);

	return (
		<main className="flex w-full flex-col items-center overflow-x-hidden">
			<Content
				serverCount={serverCount}
				servers={servers.filter((n: FeaturedServer) => n.name !== "Pornhub")}
			/>
		</main>
	);
}
