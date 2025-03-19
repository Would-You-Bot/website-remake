"use client";

import { useLocale } from "@/i18n/hooks/use-locale";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { i18nData } from "@/i18n/data";
import Flag from "react-world-flags";
import { useDictionary } from "@/i18n/hooks/use-dictionary";
import type { Locale } from "@/i18n/config";

export default function LocaleSwitcher() {
	const { locale, updateLocale } = useLocale("en");
	const { updateDictionary } = useDictionary();

	const switchLocale = async (locale: Locale) => {
		await updateDictionary(locale);
		updateLocale(locale);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Flag
						code={i18nData.find((l) => l.code === locale)?.flag || "us"}
						className="w-5 h-3"
					/>
					<span className="ml-2">{locale.toUpperCase()}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{i18nData
					.filter((locale) => !locale.disabled)
					.map((locale) => (
						<DropdownMenuItem
							key={locale.code}
							onClick={() => switchLocale(locale.code)}
							className="capitalize flex items-center gap-2 cursor-pointer"
						>
							<Flag code={locale.flag} className="w-5 h-3" />
							<span>{locale.name}</span>
						</DropdownMenuItem>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
