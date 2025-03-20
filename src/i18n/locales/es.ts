import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/utils/interpolate";

export const es: Dictionary = {
	homepage: {
		getStarted: "Comience editando",
		saveChanges: "Guarde y vea sus cambios al instante",
	},
	testing: {
		placeholder: interpolate(
			"Este es un ejemplo de un marcador de posición. El recuento es: {{count}}",
		),
		greet: interpolate(
			"¡Hola, {{name}}! ¿Cómo estás hoy? Tu apellido es {{surname}}",
		),
	},
};
