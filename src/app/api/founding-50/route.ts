import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { persistFoundingFiftyApplication } from "@/lib/persist";

function clean(value: unknown, max = 2000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Please complete the application." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const emailRaw = clean(body.email, 254);
  const whatYouKnow = clean(body.whatYouKnow);
  const whatYouWantToKnow = clean(body.whatYouWantToKnow);

  if (!name || !whatYouKnow || !whatYouWantToKnow || !isValidEmail(emailRaw)) {
    return NextResponse.json(
      { error: "Name, a valid email, and both questions are required." },
      { status: 400 }
    );
  }

  try {
    const result = await persistFoundingFiftyApplication({
      name,
      email: normalizeEmail(emailRaw),
      whatYouKnow,
      whatYouWantToKnow,
    });
    return NextResponse.json({
      ok: true,
      duplicate: result === "duplicate",
      message:
        result === "duplicate"
          ? "We already have your application. Thank you."
          : "Your application is in. We'll be in touch.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save your application.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
