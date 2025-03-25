"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { Locale } from "@/i18n/config";
import { i18nData } from "@/i18n/data";
import { setUserLocale } from "@/i18n/services/locale";
import { useLocale } from "next-intl";
import Flag from "react-world-flags";

export default function LocaleSwitcher() {
	const locale = useLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Flag
						code={i18nData.find((l) => l.code === locale)?.flag}
						className="h-3 w-5"
					/>
					<span className="ml-2 uppercase">{locale}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{i18nData.map((locale) => (
					<DropdownMenuItem
						key={locale.code}
						onClick={() => setUserLocale(locale.code as Locale)}
						className="flex cursor-pointer items-center gap-2 capitalize"
					>
						<Flag
							code={locale.flag}
							className="h-3 w-5"
						/>
						<span>{locale.name}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
