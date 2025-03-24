import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./"
});

const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
	},
	transformIgnorePatterns: ["/node_modules/(?!(next-intl)/)"]
};

export default createJestConfig(config);
