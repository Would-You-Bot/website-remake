export type I18nData = {
	code: string;
	name: string;
	flag: string;
	disabled?: boolean;
};

type InterpolatedString<TParams> = (params: TParams) => string;

export type Dictionary = {
	homepage: {
		getStarted: string;
		saveChanges: string;
	};
	testing: {
		placeholder: InterpolatedString<{ count: number }>;
		greet: InterpolatedString<{ name: string; surname: string }>;
	};
};
