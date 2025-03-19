import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "./i18n/config";

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const firstSegment = pathname.split("/")[1] || "";

	if (locales.includes(firstSegment)) {
		const pathWithoutLocale = pathname.replace(`/${firstSegment}`, "") || "/";
		const redirectUrl = new URL(pathWithoutLocale, request.url);

		const response = NextResponse.redirect(redirectUrl, 307);
		response.cookies.set("NEXT_LOCALE", firstSegment, {
			path: "/",
			httpOnly: false,
			sameSite: "strict",
		});

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
