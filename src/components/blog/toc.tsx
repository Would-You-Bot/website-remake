"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TableOfContentsProps {
	content: string;
}

interface Heading {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeHeading, setActiveHeading] = useState<string>("");

	useEffect(() => {
		if (!content) return;

		const div = document.querySelector("div.blog-post");
		if (!div) return;

		const headingElements = div.querySelectorAll("h1, h2, h3, h4, h5, h6");

		const extractedHeadings: Heading[] = Array.from(headingElements)
			.filter((el) => el.id)
			.map((el) => ({
				id: el.id,
				text: el.textContent || "",
				level: Number.parseInt(el.tagName.substring(1)),
			}));

		setHeadings(extractedHeadings);
	}, [content]);

	// Set up intersection observer to highlight active heading
	useEffect(() => {
		if (typeof window === "undefined" || headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveHeading(entry.target.id);
					}
				}
			},
			{
				rootMargin: "-100px 0px -80% 0px",
				threshold: 0,
			},
		);

		// Observe all heading elements in the document
		for (const { id } of headings) {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		}

		return () => {
			for (const { id } of headings) {
				const element = document.getElementById(id);
				if (element) observer.unobserve(element);
			}
		};
	}, [headings]);

	if (headings.length === 0) {
		return null;
	}

	// Scroll to heading when clicked
	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
			setActiveHeading(id);
		}
	};

	return (
		<div className="space-y-4">
			<h4 className="font-medium text-lg">Table of Contents</h4>
			<ScrollArea className="max-h-[calc(100vh-200px)]">
				<nav className="space-y-1">
					{headings.map((heading) => (
						<button
							type="button"
							key={heading.id}
							onClick={() => scrollToHeading(heading.id)}
							className={cn(
								"block text-left w-full text-sm py-1 px-2 rounded-md transition-colors hover:bg-muted",
								activeHeading === heading.id
									? "font-medium text-primary"
									: "text-muted-foreground",
								heading.level === 1 && "pl-2",
								heading.level === 2 && "pl-4",
								heading.level === 3 && "pl-6",
								heading.level === 4 && "pl-8",
								heading.level === 5 && "pl-10",
								heading.level === 6 && "pl-12",
							)}
						>
							{heading.text}
						</button>
					))}
				</nav>
			</ScrollArea>
		</div>
	);
}
