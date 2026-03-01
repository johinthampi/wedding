import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const auth = request.cookies.get("admin-auth");

  // Allow login page
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // Protect everything else under /admin
  if (pathname.startsWith("/admin") && !auth) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};