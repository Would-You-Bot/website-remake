"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Flag from "react-world-flags";
import { i18nData } from "@/i18n/data";
import { setUserLocale } from "@/i18n/services/locale";
import type { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
	const locale = useLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Flag
						code={i18nData.find((l) => l.code === locale)?.flag}
						className="w-5 h-3"
					/>
					<span className="ml-2 uppercase">{locale}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{i18nData.map((locale) => (
					<DropdownMenuItem
						key={locale.code}
						onClick={() => setUserLocale(locale.code as Locale)}
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
