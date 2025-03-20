import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/utils/interpolate";

export const example: Dictionary = {
	homepage: {
		getStarted: "",
		saveChanges: "",
	},
	testing: {
		placeholder: interpolate(""),
		greet: interpolate(""),
	},
};
