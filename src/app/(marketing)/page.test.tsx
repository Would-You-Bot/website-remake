/**
 * @jest-environment jsdom
 */
import Page from "@/app/(marketing)/page";
import translations from "@/i18n/translations/en.json";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

describe("Home", () => {
	it("renders a heading", () => {
		render(
			<NextIntlClientProvider
				locale="en"
				messages={translations}
			>
				<Page />
			</NextIntlClientProvider>
		);

		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
	});
});
