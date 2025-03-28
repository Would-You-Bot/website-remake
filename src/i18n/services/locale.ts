"use server";

import { type Locale, defaultLocale } from "@/i18n/config";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
	return ((await cookies()).get(COOKIE_NAME)?.value as Locale) || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
	(await cookies()).set(COOKIE_NAME, locale);
}
