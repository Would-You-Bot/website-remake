"use client";

import type { Locale } from "@/i18n/config";
import { getUserLocale, setUserLocale } from "@/i18n/services/locale";
import { authClient } from "@/lib/auth-client";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Flag from "react-world-flags";
import {
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger
} from "./ui/dropdown-menu";

export default function LanguageSwitcher() {
	const t = useTranslations();
	const { data: session } = authClient.useSession();
	const [lang, setLang] = useState("en");

	useEffect(() => {
		async function getLang() {
			setLang(await getUserLocale());
		}

		getLang();
	}, []);

	const handleLocaleChange = (value: string) => {
		setUserLocale(value as Locale);
		setLang(value);

		if (session) {
			authClient.updateUser({
				locale: value
			});
		}
	};

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<Languages className="size-4 text-muted-foreground" />
				{t("nav.dropdown.language")}
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
				<DropdownMenuRadioGroup
					value={lang}
					onValueChange={(value) => handleLocaleChange(value)}
				>
					<DropdownMenuRadioItem value="en">
						<Flag
							code="us"
							className="size-4"
						/>
						English
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="de">
						<Flag
							code="de"
							className="size-4"
						/>
						Deutsch
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="fr">
						<Flag
							code="fr"
							className="size-4"
						/>
						Français
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="es">
						<Flag
							code="es"
							className="size-4"
						/>
						Española
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="it">
						<Flag
							code="it"
							className="size-4"
						/>
						Italiana
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
}
