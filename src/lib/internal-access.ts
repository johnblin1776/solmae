import { createHash, timingSafeEqual } from "crypto";

export const INTERNAL_COOKIE = "solmae_internal";

export const INTERNAL_ROUTE_PREFIXES = [
  "/home",
  "/invite",
  "/apply",
  "/members",
  "/creators",
  "/businesses",
  "/admin",
  "/onboard",
  "/profile",
  "/benches",
] as const;

export function isInternalPath(pathname: string) {
  return INTERNAL_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function cookieValueForSecret(secret: string) {
  return createHash("sha256").update(secret).digest("hex");
}

export function cookieMatchesSecret(value: string | undefined, secret: string) {
  if (!value) return false;
  const expected = cookieValueForSecret(secret);
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isInternalAccessEnabled() {
  return process.env.INTERNAL_ACCESS_ENABLED === "true";
}

export function requestHasInternalAccess(cookieValue: string | undefined) {
  if (isInternalAccessEnabled()) return true;
  const secret = process.env.INTERNAL_GATE_SECRET;
  if (!secret) return false;
  return cookieMatchesSecret(cookieValue, secret);
}
