import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { persistWaitlistSignup } from "@/lib/persist";

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown };
  try {
    body = (await request.json()) as { email?: unknown; source?: unknown };
  } catch {
    return NextResponse.json({ error: "Please send a valid email address." }, { status: 400 });
  }

  if (typeof body.email !== "string" || !isValidEmail(body.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  const source = typeof body.source === "string" && body.source.trim() ? body.source.trim() : "landing";

  try {
    const result = await persistWaitlistSignup(email, source);
    return NextResponse.json({
      ok: true,
      duplicate: result === "duplicate",
      message:
        result === "duplicate"
          ? "You're already on the list. We'll be in touch."
          : "You're on the list. We'll be in touch.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save your email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
