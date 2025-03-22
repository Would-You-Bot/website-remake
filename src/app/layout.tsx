import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { ReactNode } from "react";
import Providers from "./providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	metadataBase: new URL("https://wouldyoubot.gg"),
	alternates: {
		canonical: "/"
	},
	title: "Would You - The Discord Bot",
	description:
		"Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
	robots: "index, follow",
	publisher: "Rivo",
	openGraph: {
		title: "Would You - The Discord Bot",
		images: "https://wouldyoubot.gg/showcase.png",
		description:
			"Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
		type: "website",
		url: "https://wouldyoubot.gg"
	},
	twitter: {
		card: "summary_large_image",
		title: "Would You - The Discord Bot",
		images: "https://wouldyoubot.gg/showcase.png",
		description:
			"Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
		site: "@WouldYouBot"
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-icon.png",
		shortcut: "/favicon-16x16.png"
	}
};

export default async function RootLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	const locale = await getLocale();

	return (
		<html
			lang={locale}
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-dvh w-full flex-col antialiased`}
			>
				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
