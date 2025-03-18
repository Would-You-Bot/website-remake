"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n/config";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LocaleSwitcher() {
	const pathname = usePathname();
	const redirectedPathname = (locale: Locale) => {
		if (!pathname) return "/";
		const segments = pathname.split("/");
		segments[1] = locale;
		return segments.join("/");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Locale Switcher</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{i18n.locales.map((locale) => (
					<DropdownMenuItem key={locale} asChild>
						<Link href={redirectedPathname(locale)} className="uppercase">
							{locale}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
