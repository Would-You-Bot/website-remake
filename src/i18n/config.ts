/**
 * The dictionary type
 */
export const locales: string[] = ["en", "de"];

/**
 * Define the i18n configuration dynamically
 */
export const i18n = {
	defaultLocale: "en",
	locales: locales,
} as const;

export type Locale = (typeof i18n.locales)[number];
