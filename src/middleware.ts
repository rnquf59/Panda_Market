import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const allowedPaths = ["/", "/auth/login", "/auth/signup"];
  const isAllowedPath =
    allowedPaths.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/favicon.ico") ||
    nextUrl.pathname.startsWith("/logo") ||
    nextUrl.pathname.startsWith("/icon") ||
    nextUrl.pathname.startsWith("/image") ||
    nextUrl.pathname.startsWith("/api");

  const authToken = request.headers.get("x-auth-token");
  const isLoggedIn = !!authToken;

  if (!isAllowedPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo|icon|image|api).*)",
  ],
};
