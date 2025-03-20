import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/utils/interpolate";

export const fr: Dictionary = {
	homepage: {
		getStarted: "Commencez par éditer",
		saveChanges: "Enregistrez et visualisez vos modifications instantanément",
	},
	testing: {
		placeholder: interpolate(
			"Ceci est un exemple de placeholder. Le compte est: {{count}}",
		),
		greet: interpolate(
			"Bonjour, {{name}}! Comment vas-tu aujourd'hui? Ton nom de famille est {{surname}}",
		),
	},
};
