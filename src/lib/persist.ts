import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

type JsonRecord = Record<string, unknown>;

type SheetKind = "waitlist" | "founding-50";

type SheetPayload = {
  email: string;
  source: string;
  createdAt: string;
  kind: SheetKind;
  name?: string;
  whatYouKnow?: string;
  whatYouWantToKnow?: string;
};

function dataDir() {
  return path.join(process.cwd(), ".data");
}

async function readFileStore<T extends JsonRecord>(file: string): Promise<T[]> {
  try {
    const raw = await readFile(path.join(dataDir(), file), "utf8");
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore<T extends JsonRecord>(file: string, rows: T[]) {
  await mkdir(dataDir(), { recursive: true });
  await writeFile(path.join(dataDir(), file), JSON.stringify(rows, null, 2));
}

function emailsMatch(left: string, right: string) {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

function getSheetWebhookUrl(kind: SheetKind) {
  const foundingUrl = process.env.FOUNDING_50_SHEET_WEBHOOK_URL?.trim();
  const waitlistUrl = process.env.WAITLIST_SHEET_WEBHOOK_URL?.trim();
  if (kind === "founding-50") return foundingUrl || waitlistUrl || undefined;
  return waitlistUrl || undefined;
}

function missingWebhookMessage(kind: SheetKind) {
  if (kind === "founding-50") {
    return "Application storage is not configured. Set WAITLIST_SHEET_WEBHOOK_URL.";
  }
  return "Waitlist storage is not configured. Set WAITLIST_SHEET_WEBHOOK_URL.";
}

type WebhookResponse = {
  ok?: boolean;
  duplicate?: boolean;
  error?: string;
};

async function postSheetWebhook(url: string, payload: SheetPayload): Promise<PersistResult> {
  const secret = process.env.WAITLIST_SHEET_WEBHOOK_SECRET?.trim();
  const body: Record<string, unknown> = {
    email: payload.email,
    source: payload.source,
    createdAt: payload.createdAt,
    kind: payload.kind,
  };
  if (payload.name) body.name = payload.name;
  if (payload.whatYouKnow) body.whatYouKnow = payload.whatYouKnow;
  if (payload.whatYouWantToKnow) body.whatYouWantToKnow = payload.whatYouWantToKnow;
  if (secret) body.secret = secret;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (secret) {
    headers["X-Webhook-Secret"] = secret;
    headers.Authorization = `Bearer ${secret}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    redirect: "follow",
    cache: "no-store",
  });

  const text = await response.text();
  let parsed: WebhookResponse = {};
  try {
    parsed = JSON.parse(text) as WebhookResponse;
  } catch {
    parsed = {};
  }

  if (response.status === 409 || parsed.duplicate) {
    return "duplicate";
  }

  if (!response.ok || parsed.ok === false) {
    const detail = parsed.error || text.slice(0, 200) || `status ${response.status}`;
    console.error("Sheet webhook failed", response.status, detail);
    throw new Error(`Sheet webhook failed (${response.status}).`);
  }

  return "created";
}

async function persistWithSheetOrFile<T extends JsonRecord>(
  kind: SheetKind,
  payload: SheetPayload,
  file: string,
  row: T
): Promise<PersistResult> {
  const webhookUrl = getSheetWebhookUrl(kind);
  if (webhookUrl) {
    return postSheetWebhook(webhookUrl, payload);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(missingWebhookMessage(kind));
  }

  const rows = await readFileStore<T>(file);
  if (rows.some((existing) => typeof existing.email === "string" && emailsMatch(existing.email, payload.email))) {
    return "duplicate";
  }
  rows.push(row);
  await writeFileStore(file, rows);
  return "created";
}

export type PersistResult = "created" | "duplicate";

export async function persistWaitlistSignup(email: string, source: string): Promise<PersistResult> {
  const createdAt = new Date().toISOString();
  return persistWithSheetOrFile(
    "waitlist",
    { email, source, createdAt, kind: "waitlist" },
    "waitlist.json",
    { email, source, created_at: createdAt }
  );
}

export type FoundingFiftyInput = {
  name: string;
  email: string;
  whatYouKnow: string;
  whatYouWantToKnow: string;
};

export async function persistFoundingFiftyApplication(
  input: FoundingFiftyInput
): Promise<PersistResult> {
  const createdAt = new Date().toISOString();
  return persistWithSheetOrFile(
    "founding-50",
    {
      email: input.email,
      source: "founding-50",
      createdAt,
      kind: "founding-50",
      name: input.name,
      whatYouKnow: input.whatYouKnow,
      whatYouWantToKnow: input.whatYouWantToKnow,
    },
    "founding-fifty.json",
    { ...input, created_at: createdAt }
  );
}
