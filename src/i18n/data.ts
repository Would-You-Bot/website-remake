import type { Locale } from "@/i18n/config";

type I18nData = {
	code: Locale;
	name: string;
	flag: string;
};

export const i18nData: I18nData[] = [
	{
		code: "en",
		name: "English (US)",
		flag: "us"
	},
	{
		code: "de",
		name: "Deutsch",
		flag: "de"
	},
	{
		code: "es",
		name: "Español",
		flag: "es"
	},
	{
		code: "fr",
		name: "Français",
		flag: "fr"
	},
	{
		code: "it",
		name: "Italiano",
		flag: "it"
	}
];
