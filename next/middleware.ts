import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ログインページはガード対象外
    if (pathname === "/manage/login") {
        return NextResponse.next();
    }

    const apiUrl =
        process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookie = request.cookies.get("access_token");

    try {
        const res = await fetch(`${apiUrl}/auth`, {
            headers: {
                Cookie: cookie ? `access_token=${cookie.value}` : "",
            },
        });

        if (!res.ok) {
            return NextResponse.redirect(
                new URL("/manage/login", request.url)
            );
        }
    } catch {
        return NextResponse.redirect(new URL("/manage/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/manage/:path*"],
};
