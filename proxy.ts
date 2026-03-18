import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  // 1. Si l'utilisateur est connecté et essaie d'aller sur les pages d'auth
  if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. Si l'utilisateur n'est PAS connecté et essaie d'aller sur le dashboard
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

// On met à jour le matcher pour inclure l'auth et le dashboard
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
