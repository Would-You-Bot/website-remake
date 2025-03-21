import { TooltipProvider } from "@/ui/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
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
