import { ReactScan } from "@/components/react-scan";
import { TooltipProvider } from "@/ui/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { PostHogProvider } from "./post-hog-provider";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<>
			<PostHogProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<TooltipProvider delayDuration={0}>
						<NextIntlClientProvider>
							<ReactScan />
							{children}
						</NextIntlClientProvider>
					</TooltipProvider>
				</ThemeProvider>
			</PostHogProvider>
		</>
	);
}
