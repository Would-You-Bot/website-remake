import { getUserLocale } from "@/i18n/services/locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		messages: (await import(`./translations/${locale}.json`)).default
	};
});
