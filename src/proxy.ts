import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Name of the admin session cookie set by the Go backend.
const SESSION_COOKIE = "neetimun_admin_session";

// Routing guard for the admin area. This is a UX convenience only — it checks
// the cookie's *presence* to avoid flashing a protected page. The backend is
// the real authority: it verifies the JWT and returns 401, at which point the
// dashboard redirects to the login page.
//
// This check is only meaningful because /api/* is same-origin (proxied to the
// backend via next.config.ts's rewrites) — the session cookie is therefore
// first-party to this app and actually visible here. Do not remove the
// rewrite proxy without re-evaluating this file: a cookie set directly by a
// different-domain backend would never appear in request.cookies.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (pathname === "/admin/login") {
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Any other /admin route requires a session cookie.
  if (!hasSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
