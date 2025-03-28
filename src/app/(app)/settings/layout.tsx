import SettingsSidebar from "@/components/(app)/settings/sidebar";
import type { ReactNode } from "react";

export default function SettingsLayout({
	children
}: Readonly<{ children: ReactNode }>) {
	return (
		<div className="mx-auto grid w-full max-w-8xl grid-cols-6 gap-4 px-8">
			<SettingsSidebar />
			<div className="col-span-5">{children}</div>
		</div>
	);
}
