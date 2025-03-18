export function formatDate(dateString: Date) {
	return new Date(dateString).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

export function calculateReadingTime(content: string) {
	const wordsPerMinute = 200;
	const minutesPerImage = 0.5;

	const text = content.trim();
	const wordCount = text.split(/\s+/g).filter((word) => word.length > 0).length;
	const imageCount = estimateImageCount(content);

	let readingTime = wordCount / wordsPerMinute;
	readingTime += imageCount * minutesPerImage;

	if (readingTime < 1) {
		return `${Math.ceil(readingTime * 60)} seconds`;
	}

	const minutes = Math.floor(readingTime);
	const seconds = Math.ceil((readingTime - minutes) * 60);

	if (seconds === 0) {
		return `${minutes} minute${minutes > 1 ? "s" : ""}`;
	}

	return `${minutes} minute${minutes > 1 ? "s" : ""} ${seconds} second${seconds > 1 ? "s" : ""}`;
}

function estimateImageCount(content: string) {
	const imageMatches = content.match(/!\[.*?\]\(.*?\)|<img.*?>/g);
	return imageMatches ? imageMatches.length : 0;
}
