import { NextRequest, NextResponse } from "next/server";

const ATTACK_PATHS = [
  "/.env",
  "/.env.local",
  "/wp-admin",
  "/wp-login.php",
  "/phpMyAdmin",
  "/xmlrpc.php",
  "/.git",
  "/admin",
];

function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bloquear paths de ataque comuns
  if (
    ATTACK_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return new NextResponse(null, { status: 404 });
  }

  // CSRF: POST para /api/* só é permitido do mesmo domínio
  if (req.method === "POST" && pathname.startsWith("/api/")) {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host) {
      try {
        if (new URL(origin).host !== host) {
          return new NextResponse(null, { status: 403 });
        }
      } catch {
        return new NextResponse(null, { status: 403 });
      }
    }
  }

  const res = NextResponse.next();
  res.headers.set("X-Request-Id", uuid());
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
