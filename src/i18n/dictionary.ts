import { i18n, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/**
 * Dynamically imports and returns the dictionary for the specified locale
 *
 * @param locale - The locale code (e.g., 'en', 'fr', 'es') to load the dictionary for
 * @returns A promise that resolves to the dictionary object for the specified locale
 * @throws Will throw an error if the locale module cannot be found
 */
const generateDictionary = async (locale: Locale) => {
	const module = await import(`@/i18n/locales/${locale}`);
	return module[locale];
};

/**
 * Creates a mapping of locale codes to their respective dictionary loader functions
 *
 * This object maps each supported locale to a function that will dynamically
 * import the corresponding locale dictionary when called.
 *
 * @type {Record<string, () => Promise<Dictionary>>}
 */
const dictionaries: Record<string, () => Promise<Dictionary>> =
	Object.fromEntries(
		i18n.locales.map((locale) => [locale, () => generateDictionary(locale)]),
	);

/**
 * Retrieves the dictionary for the specified locale
 *
 * @param locale - The locale code to get the dictionary for
 * @returns A promise that resolves to the requested locale's dictionary
 * @remarks If the requested locale is not available, falls back to English ('en')
 * @example
 * // Get Spanish translations
 * const es = await getDictionary('es');
 * // Use Spanish translation
 * console.log(es.common.welcome);
 */
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
	return (await (dictionaries[locale] ?? dictionaries.en)()) as Dictionary;
};
