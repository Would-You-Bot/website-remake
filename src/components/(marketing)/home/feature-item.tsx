import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { FC, ReactNode } from "react";

const FeatureItem: FC<{
	left: ReactNode;
	right: ReactNode;
	reverse?: true;
}> = ({ left, right, reverse }) => (
	<div className="flex w-full max-w-8xl flex-col justify-between gap-8 rounded-md md:flex-row md:gap-20">
		<motion.div
			initial={{ opacity: 0, transform: "translateX(-50px)" }}
			whileInView={{ opacity: 1, transform: "translateX(0)" }}
			viewport={{ once: true }}
			transition={{ duration: 0.65, ease: "easeInOut" }}
			className="mx-auto flex flex-col justify-center gap-2 sm:w-2/3 md:w-1/2"
		>
			{left}
		</motion.div>
		<motion.div
			initial={{ opacity: 0, transform: "translateX(50px)" }}
			whileInView={{ opacity: 1, transform: "translateX(0)" }}
			viewport={{ once: true }}
			transition={{ duration: 0.65, ease: "easeInOut" }}
			className={cn(
				"mx-auto flex flex-col justify-center gap-2 rounded-md sm:w-2/3 md:w-1/2",
				reverse && "order-last md:order-first"
			)}
		>
			{right}
		</motion.div>
	</div>
);

export default FeatureItem;
