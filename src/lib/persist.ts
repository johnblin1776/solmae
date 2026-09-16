import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type JsonRecord = Record<string, unknown>;

function dataDir() {
  return path.join(process.cwd(), ".data");
}

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function isUniqueViolation(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return error.code === "23505" || /duplicate key/i.test(error.message ?? "");
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

export type PersistResult = "created" | "duplicate";

export async function persistWaitlistSignup(email: string, source: string): Promise<PersistResult> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("waitlist_signups").insert({ email, source });
    if (!error) return "created";
    if (isUniqueViolation(error)) return "duplicate";
    throw new Error(error.message);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Waitlist storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and a Supabase key.");
  }

  const rows = await readFileStore<{ email: string; source: string; created_at: string }>(
    "waitlist.json"
  );
  if (rows.some((row) => row.email === email)) return "duplicate";
  rows.push({ email, source, created_at: new Date().toISOString() });
  await writeFileStore("waitlist.json", rows);
  return "created";
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
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("founding_fifty_applications").insert({
      name: input.name,
      email: input.email,
      what_you_know: input.whatYouKnow,
      what_you_want_to_know: input.whatYouWantToKnow,
    });
    if (!error) return "created";
    if (isUniqueViolation(error)) return "duplicate";
    throw new Error(error.message);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Application storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and a Supabase key.");
  }

  const rows = await readFileStore<FoundingFiftyInput & { created_at: string }>(
    "founding-fifty.json"
  );
  if (rows.some((row) => row.email === input.email)) return "duplicate";
  rows.push({ ...input, created_at: new Date().toISOString() });
  await writeFileStore("founding-fifty.json", rows);
  return "created";
}
