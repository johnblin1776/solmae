import { cookies } from "next/headers";
import {
  INTERNAL_COOKIE,
  cookieMatchesSecret,
  isInternalAccessEnabled,
} from "@/lib/internal-access";

export async function hasInternalAccess() {
  if (isInternalAccessEnabled()) return true;
  const secret = process.env.INTERNAL_GATE_SECRET;
  if (!secret) return false;
  const store = await cookies();
  return cookieMatchesSecret(store.get(INTERNAL_COOKIE)?.value, secret);
}
