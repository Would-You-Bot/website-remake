import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/utils/interpolate";

export const tr: Dictionary = {
	homepage: {
		getStarted: "Düzenleyerek başlayın",
		saveChanges: "Değişikliklerinizi kaydedin ve anında görün",
	},
	testing: {
		placeholder: interpolate("Bu bir yer tutucu örneğidir. Sayım: {{count}}"),
		greet: interpolate(
			"Merhaba, {{name}}! Bugün nasılsın? Soyadın {{surname}}",
		),
	},
};
