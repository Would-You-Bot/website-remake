import { cn } from "@/lib/utils";
import type React from "react";

type ProseProps = React.HTMLAttributes<HTMLElement> & {
	as?: "article";
	html: string;
};

export function Prose({ children, html, className }: ProseProps) {
	return (
		<article
			className={cn(
				"prose mx-auto prose-img:rounded-xl prose-p:text-justify prose-h1:font-bold prose-headings:font-normal prose-headings:font-serif prose-a:text-blue-600 prose-h1:text-xl",
				className
			)}
		>
			{html ? (
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{ __html: html }}
					className="blog-post"
				/>
			) : (
				children
			)}
		</article>
	);
}
