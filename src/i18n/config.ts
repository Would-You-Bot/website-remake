import { i18nData } from "@/i18n/data";

/**
 * The dictionary type
 */
export const locales: string[] = i18nData
	.filter((locale) => !locale.disabled)
	.map((locale) => locale.code);

/**
 * Define the i18n configuration dynamically
 */
export const i18n = {
	defaultLocale: locales[0],
	locales: locales,
} as const;

export type Locale = (typeof i18n.locales)[number];
