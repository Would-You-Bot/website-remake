import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/utils/interpolate";

export const it: Dictionary = {
	homepage: {
		getStarted: "Inizia modificando",
		saveChanges: "Salva e visualizza le tue modifiche all'istante",
	},
	testing: {
		placeholder: interpolate(
			"Questo è un esempio di segnaposto. Il conteggio è: {{count}}",
		),
		greet: interpolate(
			"Ciao, {{name}}! Come stai oggi? Il tuo cognome è {{surname}}",
		),
	},
};
