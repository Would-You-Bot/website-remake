import {
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger
} from "@/ui/dropdown-menu";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
	const t = useTranslations("nav.dropdown.theme");
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<SunMoon className="size-4 text-muted-foreground" />
				{t("title")}
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={(value) => setTheme(value)}
				>
					<DropdownMenuRadioItem value="dark">
						<Moon className="size-4" />
						{t("dark")}
					</DropdownMenuRadioItem>

					<DropdownMenuRadioItem value="light">
						<Sun className="size-4" />
						{t("light")}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
}
