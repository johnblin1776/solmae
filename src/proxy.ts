import { NextResponse, type NextRequest } from "next/server";
import {
  INTERNAL_COOKIE,
  isInternalPath,
  requestHasInternalAccess,
} from "@/lib/internal-access";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isInternalPath(pathname)) {
    return NextResponse.next();
  }

  if (requestHasInternalAccess(request.cookies.get(INTERNAL_COOKIE)?.value)) {
    return NextResponse.next();
  }

  const blocked = request.nextUrl.clone();
  blocked.pathname = "/blocked";
  return NextResponse.rewrite(blocked);
}

export const config = {
  matcher: [
    "/home",
    "/home/:path*",
    "/invite",
    "/invite/:path*",
    "/apply",
    "/apply/:path*",
    "/members",
    "/members/:path*",
    "/creators",
    "/creators/:path*",
    "/businesses",
    "/businesses/:path*",
    "/admin",
    "/admin/:path*",
    "/onboard",
    "/onboard/:path*",
    "/profile",
    "/profile/:path*",
    "/benches",
    "/benches/:path*",
  ],
};
