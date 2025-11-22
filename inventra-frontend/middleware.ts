import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If user is on login/signup pages and authenticated, redirect to dashboard
  if ((pathname === "/" || pathname === "/signup") && request.cookies.get("auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If user is on protected routes and not authenticated, redirect to login
  if (pathname.startsWith("/dashboard") && !request.cookies.get("auth")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
