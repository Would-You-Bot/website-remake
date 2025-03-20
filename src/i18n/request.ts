import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/i18n/services/locale";

const path = "@/i18n/translations";

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		messages: (await import(`${path}/${locale}.json`)).default,
	};
});
