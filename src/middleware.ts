import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const allowedPaths = ["/", "/auth/login", "/auth/signup"];
  const isAllowedPath = allowedPaths.includes(nextUrl.pathname);

  const authToken = request.headers.get("x-auth-token");
  const isLoggedIn = !!authToken;

  if (!isAllowedPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/auth") && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};
