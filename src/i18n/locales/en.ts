import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/utils/interpolate";

export const en: Dictionary = {
	homepage: {
		getStarted: "Get started by editing",
		saveChanges: "Save and see your changes instantly",
	},
	testing: {
		placeholder: interpolate(
			"This an example of a placeholder. Count is: {{count}}",
		),
		greet: interpolate(
			"Hello, {{name}}! How are you today? Your surname is {{surname}}",
		),
	},
};
