import type translations from "@/i18n/translations/en.json";

export type Locale = (typeof locales)[number];

export const locales = ["en", "de", "es", "fr", "it"] as const;
export const defaultLocale: Locale = "en";

declare module "next-intl" {
	interface AppConfig {
		Locale: Locale;
		Messages: typeof translations;
	}
}
