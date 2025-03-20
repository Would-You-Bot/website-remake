import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/utils/interpolate";

export const de: Dictionary = {
	homepage: {
		getStarted: "Los geht's mit dem Bearbeiten",
		saveChanges: "Speichern und Änderungen sofort sehen",
	},
	testing: {
		placeholder: interpolate(
			"Dies ist ein Beispiel für einen Platzhalter. Zähler ist: {{count}}",
		),
		greet: interpolate(
			"Hallo, {{name}}! Wie geht es dir heute? Dein Nachname ist {{surname}}",
		),
	},
};
