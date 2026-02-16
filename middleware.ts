import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Sirve public/index.html pero mantén la URL como "/"
  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/index.html", req.url));
  }

  return NextResponse.next();
}

// Aplica solo a la home
export const config = {
  matcher: ["/"],
};
