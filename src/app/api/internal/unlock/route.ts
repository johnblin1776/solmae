import { NextResponse } from "next/server";
import {
  INTERNAL_COOKIE,
  cookieValueForSecret,
  isInternalAccessEnabled,
} from "@/lib/internal-access";

export async function POST(request: Request) {
  if (isInternalAccessEnabled()) {
    return NextResponse.json({ ok: true, alreadyOpen: true });
  }

  const secret = process.env.INTERNAL_GATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Internal access is not configured. Set INTERNAL_GATE_SECRET." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    password = "";
  }

  if (password !== secret) {
    return NextResponse.json({ error: "That password doesn't match." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: INTERNAL_COOKIE,
    value: cookieValueForSecret(secret),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
