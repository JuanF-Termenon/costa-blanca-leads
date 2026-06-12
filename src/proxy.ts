import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const session = request.cookies.get("admin_session");
  if (session?.value === "authenticated") return NextResponse.next();

  return NextResponse.redirect(new URL("/admin/login", request.url));
}
