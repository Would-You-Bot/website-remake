import { Container } from "@/components/blog/container";
import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
	return (
		<Container className="min-h-[calc(100vh-100px)] py-14">
			<section className="space-y-6 lg:space-y-8 mx-auto">
				<div className="flex flex-col items-center gap-4">
					<Skeleton className="h-12 w-3/4" />
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-8 w-48" />
				</div>
				<Skeleton className="h-[360px] w-full rounded-lg md:rounded-xl" />
				<div className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-4/6" />
				</div>
			</section>
		</Container>
	);
}
