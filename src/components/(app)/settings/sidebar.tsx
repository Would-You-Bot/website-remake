"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ShieldUser, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

export default function SettingsSidebar() {
	const t = useTranslations("settings.sidebar");
	const pathname = usePathname();

	return (
		<div className="w-full rounded-xl border border-border bg-card px-4 py-4">
			<p className="mb-2 px-4 text-muted-foreground">{t("account.label")}</p>
			<ul className="flex flex-col gap-1">
				<SettingsSidebarItem
					href={"/settings/profile"}
					selected={pathname === "/settings/profile"}
				>
					<User className="size-4" />
					{t("account.profile")}
				</SettingsSidebarItem>
				<SettingsSidebarItem
					href={"/settings/privacy"}
					selected={pathname === "/settings/privacy"}
				>
					<ShieldUser className="size-4" />
					{t("account.privacy")}
				</SettingsSidebarItem>
			</ul>
		</div>
	);
}

function SettingsSidebarItem({
	selected,
	children,
	...props
}: ComponentProps<typeof Link> & {
	selected: boolean;
	children: ReactNode;
}) {
	return (
		<Link href={props.href}>
			<li
				className={cn(
					clsx(
						"flex flex-row items-center gap-2 rounded-md px-4 py-2 text-lg text-muted-foreground transition-all hover:bg-accent hover:text-foreground",
						{ "bg-accent text-foreground": selected }
					)
				)}
			>
				{children}
			</li>
		</Link>
	);
}
