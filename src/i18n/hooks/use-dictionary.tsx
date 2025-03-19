// use-dictionary.ts
"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { getDictionary } from "@/i18n/dictionary";
import { useLocale } from "@/i18n/hooks/use-locale";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

type DictionaryContextType = {
	dictionary: Dictionary | undefined;
	isLoading: boolean;
	updateDictionary: (newLocale: Locale) => Promise<void>;
};

// Create a context to share dictionary state across components
const DictionaryContext = createContext<DictionaryContextType | undefined>(
	undefined,
);

export const DictionaryProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const { locale, updateLocale } = useLocale("en");
	const [dictionary, setDictionary] = useState<Dictionary>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchDictionary = async () => {
			setIsLoading(true);
			try {
				const dict = await getDictionary(locale);
				setDictionary(dict);
			} catch (error) {
				console.error("Failed to fetch dictionary:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDictionary();
	}, [locale]);

	const updateDictionary = async (newLocale: Locale): Promise<void> => {
		setIsLoading(true);
		try {
			updateLocale(newLocale);
			const dict = await getDictionary(newLocale);
			setDictionary(dict);
		} catch (error) {
			console.error("Failed to update dictionary:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DictionaryContext.Provider
			value={{ dictionary, isLoading, updateDictionary }}
		>
			{children}
		</DictionaryContext.Provider>
	);
};

export const useDictionary = (): DictionaryContextType => {
	const context = useContext(DictionaryContext);
	if (context === undefined) {
		throw new Error("useDictionary must be used within a DictionaryProvider");
	}
	return context;
};
