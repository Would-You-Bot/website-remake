/**
 * @jest-environment jsdom
 */
import Page from "@/app/(marketing)/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
	it("renders a heading", () => {
		render(<Page />);

		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
	});
});
