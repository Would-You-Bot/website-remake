import { TooltipProvider } from "@/ui/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<TooltipProvider delayDuration={0}>
					<NextIntlClientProvider>{children}</NextIntlClientProvider>
				</TooltipProvider>
			</ThemeProvider>
		</>
	);
}
