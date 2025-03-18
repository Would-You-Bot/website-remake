import { cn } from "@/lib/utils";
import type React from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ children, className }: ContainerProps) {
	return (
		<div
			className={cn(
				"mx-auto w-full h-full container px-6 md:px-14 lg:px-20 z-10",
				className,
			)}
		>
			{children}
		</div>
	);
}
