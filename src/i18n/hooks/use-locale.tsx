"use client";

import { useState, useEffect } from "react";

const LOCALE_KEY = "user-locale";

export const useLocale = (defaultLocale: string) => {
	const [locale, setLocale] = useState(defaultLocale);

	useEffect(() => {
		const storedLocale = document.cookie
			.split("; ")
			.find((row) => row.startsWith("NEXT_LOCALE="))
			?.split("=")[1];

		if (storedLocale) {
			setLocale(storedLocale);
		} else {
			const localStorageLocale = localStorage.getItem(LOCALE_KEY);
			if (localStorageLocale) {
				setLocale(localStorageLocale);
			}
		}
	}, []);

	const updateLocale = (newLocale: string) => {
		document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
		localStorage.setItem(LOCALE_KEY, newLocale);
		setLocale(newLocale);
	};

	return { locale, updateLocale };
};
