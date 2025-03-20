"use client";

import Image from "next/image";
import LocaleSwitcher from "@/components/i18n/locale-switcher";
import { useDictionary } from "@/i18n/hooks/use-dictionary";

export default function Home() {
	const { dict, isLoading, error } = useDictionary();

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				Error loading translations: {error.message}
			</div>
		);
	}

	if (isLoading || !dict) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				Loading...
			</div>
		);
	}

	return (
		<div className="grid grid-rows-[20px_1fr_20px] justify-items-center p-8 font-[family-name:var(--font-geist-sans)] gap-16 items-center min-h-screen pb-20 sm:p-20">
			<LocaleSwitcher />
			<main className="flex flex-col row-start-2 gap-[32px] items-center sm:items-start">
				<Image
					className="dark:invert"
					src="/next.svg"
					alt="Next.js logo"
					width={180}
					height={38}
					priority
				/>
				<ol className="list-decimal list-inside text-center text-sm/6 font-[family-name:var(--font-geist-mono)] sm:text-left">
					<li className="mb-2 tracking-[-.01em]">
						{dict.homepage.getStarted}{" "}
						<code className="bg-black/[.05] rounded dark:bg-white/[.06] font-[family-name:var(--font-geist-mono)] font-semibold px-1 py-0.5">
							app/page.tsx
						</code>
						.
					</li>
					<li className="tracking-[-.01em]">{dict.homepage.saveChanges}.</li>
					<li className="tracking-[-.01em]">
						{dict.testing.placeholder({ count: 23 })}.
					</li>
					<li className="tracking-[-.01em]">
						{dict.testing.greet({ name: "Diogo", surname: "Paulos" })}.
					</li>
				</ol>

				<div className="flex flex-col gap-4 items-center sm:flex-row">
					<a
						className="flex bg-foreground border border-solid border-transparent h-10 justify-center rounded-full text-background text-sm dark:hover:bg-[#ccc] font-medium gap-2 hover:bg-[#383838] items-center px-4 sm:h-12 sm:px-5 sm:text-base sm:w-auto transition-colors"
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							className="dark:invert"
							src="/vercel.svg"
							alt="Vercel logomark"
							width={20}
							height={20}
						/>
						Deploy now
					</a>
					<a
						className="flex border border-black/[.08] border-solid h-10 justify-center rounded-full text-sm w-full dark:border-white/[.145] dark:hover:bg-[#1a1a1a] font-medium hover:bg-[#f2f2f2] hover:border-transparent items-center md:w-[158px] px-4 sm:h-12 sm:px-5 sm:text-base sm:w-auto transition-colors"
						href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Read our docs
					</a>
				</div>
			</main>
			<footer className="flex flex-wrap row-start-3 justify-center gap-[24px] items-center">
				<a
					className="flex gap-2 hover:underline hover:underline-offset-4 items-center"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					className="flex gap-2 hover:underline hover:underline-offset-4 items-center"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					className="flex gap-2 hover:underline hover:underline-offset-4 items-center"
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer>
		</div>
	);
}
