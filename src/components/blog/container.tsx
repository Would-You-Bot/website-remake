import { cn } from "@/lib/utils";
import type React from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ children, className }: ContainerProps) {
	return (
		<div
			className={cn(
				"container z-10 mx-auto h-full w-full px-6 md:px-14 lg:px-20",
				className
			)}
		>
			{children}
		</div>
	);
}
