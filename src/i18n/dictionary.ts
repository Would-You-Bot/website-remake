// import "server-only";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/**
 * Dynamically generate the dictionary
 * @param locale
 * @returns
 */
const generateDictionary = async (locale: Locale) => {
	const module = await import(`@/i18n/locales/${locale}`);
	return module[locale];
};

/**
 * Dynamically generate the dictionary loader object
 */
const dictionaries: Record<string, () => Promise<Dictionary>> =
	Object.fromEntries(
		locales.map((locale) => [locale, () => generateDictionary(locale)]),
	);

/**
 * Get the dictionary for the given locale
 * @param locale
 * @returns
 */
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
	return (await (dictionaries[locale] ?? dictionaries.en)()) as Dictionary;
};
