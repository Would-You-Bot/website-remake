export const SiteMetadata = {
	metadataBase: new URL("https://wouldyoubot.gg"),
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "https://wouldyoubot.gg"
		}
	},
	title: "Would You - The Discord Bot",
	description:
		"Would You lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
	applicationName: "Would You Bot",
	author: "Rivo",
	creator: "Rivo",
	publisher: "Rivo",
	formatDetection: {
		telephone: false,
		email: false,
		address: false
	},
	keywords: [
		"discord bot",
		"would you rather",
		"never have i ever",
		"truth or dare",
		"higher or lower",
		"what would you do",
		"discord games",
		"party games"
	],
	category: "Gaming",
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1
		}
	},
	themeColor: "#5865F2", // Discord's brand color
	colorScheme: "dark light",
	referrer: "origin-when-cross-origin",
	url: "https://wouldyoubot.gg",
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 5
	},
	verification: {
		// Add your verification codes if you have them
		google: "your-google-site-verification", // Replace with actual value
		yandex: "your-yandex-verification" // Replace with actual value
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		alternateLocale: "en_GB",
		title: "Would You - The Discord Bot",
		description:
			"Would You lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
		siteName: "Would You Bot",
		url: "https://wouldyoubot.gg",
		images: [
			{
				url: "https://wouldyoubot.gg/showcase.png",
				width: 1200,
				height: 630,
				alt: "Would You Bot featuring various party games for Discord"
			},
			{
				url: "https://wouldyoubot.gg/og-alternative.png", // Consider adding an alternative image
				width: 1200,
				height: 630,
				alt: "Would You Bot logo with game examples"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		site: "@WouldYouBot",
		creator: "@WouldYouBot",
		title: "Would You - The Discord Bot",
		description:
			"Would You lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
		images: [
			{
				url: "https://wouldyoubot.gg/showcase.png",
				alt: "Would You Bot featuring various party games for Discord",
				width: 1200,
				height: 630
			}
		]
	},
	appLinks: {
		web: {
			url: "https://wouldyoubot.gg"
		}
		// Add these if you have mobile apps
		// ios: {
		//   url: "https://apps.apple.com/app/your-app-id",
		//   appStoreId: "your-app-store-id",
		// },
		// android: {
		//   package: "com.example.wouldyoubot",
		//   url: "https://play.google.com/store/apps/details?id=com.example.wouldyoubot",
		// },
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/icon.svg", type: "image/svg+xml" }
		],
		shortcut: ["/favicon-16x16.png"],
		apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
		other: [
			{
				rel: "mask-icon",
				url: "/safari-pinned-tab.svg",
				color: "#5865F2" // Match with theme color
			},
			{
				rel: "manifest",
				url: "/site.webmanifest"
			}
		]
	},
	social: {
		twitter: "https://twitter.com/WouldYouBot",
		discord: "https://discord.gg/wouldyou", // Replace with actual Discord invite
		github: "https://github.com/yourusername/wouldyoubot" // Optional if you have a GitHub repo
	}
};
