export type Locale = (typeof locales)[number];

export const locales = ["en", "de", "es", "fr", "it"] as const;
export const defaultLocale: Locale = "en";
