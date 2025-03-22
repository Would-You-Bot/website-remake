export enum QuestionTypes {
	/** Would You Rather */
	WYR = "rather",
	/** Never Have I Ever */
	NHIE = "nhie"
}

type QuestionKey =
	| `questions.rather.${number}`
	| `questions.never.${number}`
	| "questions.error";

const questions: Record<QuestionTypes, QuestionKey[]> = {
	rather: [
		"questions.rather.1",
		"questions.rather.2",
		"questions.rather.3",
		"questions.rather.4",
		"questions.rather.5",
		"questions.rather.6",
		"questions.rather.7",
		"questions.rather.8",
		"questions.rather.9",
		"questions.rather.10"
	],
	nhie: [
		"questions.never.1",
		"questions.never.2",
		"questions.never.3",
		"questions.never.4",
		"questions.never.5",
		"questions.never.6",
		"questions.never.7",
		"questions.never.8",
		"questions.never.9",
		"questions.never.10"
	]
};

export const getRandomQuestion = (
	type: keyof typeof questions
): QuestionKey => {
	if (!type || !questions[type]) {
		return "questions.error";
	}
	const questionsOfType = questions[type];
	const randomIndex = Math.floor(Math.random() * questionsOfType.length);
	return questionsOfType[randomIndex];
};
