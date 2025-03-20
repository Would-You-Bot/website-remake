export function interpolateReplace(
	template: string,
	params: Record<string, unknown>,
): string {
	return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) =>
		(params[key] || "").toString(),
	);
}

export function interpolate(template: string) {
	return (params: Record<string, unknown>) =>
		interpolateReplace(template, params);
}
