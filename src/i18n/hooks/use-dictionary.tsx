"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { getDictionary } from "@/i18n/dictionary";
import { useLocale } from "@/i18n/hooks/use-locale";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

type DictionaryContextType = {
	dict: Dictionary | undefined;
	isLoading: boolean;
	error: Error | null;
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
	const [dict, setDictionary] = useState<Dictionary>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchDictionary = async () => {
			setIsLoading(true);
			setError(null); // Reset error state on new fetch attempt
			try {
				const dict = await getDictionary(locale);
				setDictionary(dict);
			} catch (error) {
				console.error("Failed to fetch dictionary:", error);
				setError(
					error instanceof Error
						? error
						: new Error("Failed to fetch dictionary"),
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDictionary();
	}, [locale]);

	const updateDictionary = async (newLocale: Locale): Promise<void> => {
		setIsLoading(true);
		setError(null); // Reset error state on new update attempt
		try {
			updateLocale(newLocale);
			const dict = await getDictionary(newLocale);
			setDictionary(dict);
		} catch (error) {
			console.error("Failed to update dictionary:", error);
			setError(
				error instanceof Error
					? error
					: new Error("Failed to update dictionary"),
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DictionaryContext.Provider
			value={{ dict, isLoading, error, updateDictionary }}
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
