import type { NextConfig } from "next";

// Server-only (no NEXT_PUBLIC_ prefix): the real Go backend origin. Never sent
// to the browser — the browser only ever talks to this frontend's own origin.
const BACKEND_API_URL = process.env.BACKEND_API_URL;

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  // Backend-for-Frontend proxy: every /api/* request the browser makes stays
  // same-origin (this app's own domain). Next.js forwards it server-side to
  // the Go backend and streams the response — including Set-Cookie — back
  // through this origin. This is what makes the admin session cookie
  // first-party to this frontend, regardless of which domain actually hosts
  // the backend (they are unrelated registrable domains in production:
  // *.vercel.app vs *.onrender.com, so a cookie set directly by the backend
  // can never be a first-party cookie here).
  async rewrites() {
    if (!BACKEND_API_URL) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
