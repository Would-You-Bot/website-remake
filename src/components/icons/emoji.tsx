import { useTranslations } from "next-intl";

export function CheckEmoji() {
	const t = useTranslations();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 36 36"
			width="36"
			height="36"
			className="h-5 w-5"
		>
			<title>{t("home.discordEmbed.btns.checkEmojiTitle")}</title>
			<path
				fill="#77B255"
				d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
			/>
			<path
				fill="#FFF"
				d="M29.28 6.362a2.502 2.502 0 0 0-3.458.736L14.936 23.877l-5.029-4.65a2.5 2.5 0 1 0-3.394 3.671l7.209 6.666c.48.445 1.09.665 1.696.665.673 0 1.534-.282 2.099-1.139.332-.506 12.5-19.27 12.5-19.27a2.5 2.5 0 0 0-.737-3.458z"
			/>
		</svg>
	);
}

export function CrossEmoji() {
	const t = useTranslations();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 36 36"
			width="36"
			height="36"
			className="h-5 w-5"
		>
			<title>{t("home.discordEmbed.btns.crossEmojiTitle")}</title>
			<path
				fill="#DD2E44"
				d="M21.533 18.002 33.768 5.768a2.5 2.5 0 0 0-3.535-3.535L17.998 14.467 5.764 2.233a2.498 2.498 0 0 0-3.535 0 2.498 2.498 0 0 0 0 3.535l12.234 12.234L2.201 30.265a2.498 2.498 0 0 0 1.768 4.267c.64 0 1.28-.244 1.768-.732l12.262-12.263 12.234 12.234a2.493 2.493 0 0 0 1.768.732 2.5 2.5 0 0 0 1.768-4.267L21.533 18.002z"
			/>
		</svg>
	);
}

export function NumberOneEmoji() {
	const t = useTranslations();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 36 36"
			width="36"
			height="36"
			className="h-5 w-5"
		>
			<title>{t("home.discordEmbed.btns.number1Title")}</title>
			<path
				fill="#3B88C3"
				d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
			/>
			<path
				fill="#FFF"
				d="M16.462 11.175h-1.829c-1.488 0-2.108-1.085-2.108-2.139 0-1.085.775-2.14 2.108-2.14h4.402c1.334 0 2.078.961 2.078 2.201V26.74c0 1.551-.992 2.418-2.326 2.418-1.333 0-2.325-.867-2.325-2.418V11.175z"
			/>
		</svg>
	);
}

export function NumberTwoEmoji() {
	const t = useTranslations();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 36 36"
			width="36"
			height="36"
			className="h-5 w-5"
		>
			<title>{t("home.discordEmbed.btns.number2Title")}</title>
			<path
				fill="#3B88C3"
				d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
			/>
			<path
				fill="#FFF"
				d="M23.086 24.907c1.365 0 2.42.62 2.42 2.046 0 1.427-1.055 2.047-2.233 2.047H12.917c-1.364 0-2.418-.62-2.418-2.047 0-.65.403-1.209.713-1.581 2.573-3.069 5.364-5.86 7.721-9.271.558-.806 1.085-1.768 1.085-2.884 0-1.271-.961-2.387-2.233-2.387-3.566 0-1.86 5.023-4.837 5.023-1.488 0-2.264-1.054-2.264-2.264 0-3.906 3.473-7.038 7.287-7.038 3.815 0 6.883 2.512 6.883 6.449 0 4.309-4.805 8.589-7.441 11.906h5.673z"
			/>
		</svg>
	);
}
