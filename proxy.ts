import { NextResponse } from "next/server";

export function proxy() {
  return NextResponse.next();
}

// Aplica solo a la home
export const config = {
  matcher: ["/"],
};
