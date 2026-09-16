"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MarkHalved } from "@/lib/marks";

export default function InternalGatePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/internal/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Could not unlock.");
        return;
      }
      router.push("/home");
      router.refresh();
    } catch {
      setError("Could not unlock. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-cream px-6 py-20">
      <MarkHalved className="size-12 text-ink" />
      <h1 className="mt-8 font-serif text-[32px] text-ink">Internal access</h1>
      <p className="mt-3 max-w-sm text-center text-sm leading-7 text-ink/50">
        Product surfaces stay behind this gate until the waitlist chapter is over.
      </p>
      <form onSubmit={onSubmit} className="mt-8 w-full max-w-sm">
        <label className="block text-left">
          <span className="sr-only">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Internal password"
            className="w-full border-0 border-b border-ink/20 bg-transparent py-2.5 text-[15px] outline-none focus:border-ink"
          />
        </label>
        {error ? (
          <p className="mt-3 text-[13px] text-coral" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 w-full rounded-full bg-ink py-3 text-[11px] font-semibold tracking-[0.16em] text-white uppercase disabled:opacity-50"
        >
          {loading ? "Checking…" : "Unlock"}
        </button>
      </form>
      <Link href="/" className="mt-8 text-[13px] text-ink/45 underline underline-offset-4">
        Back to Solmae
      </Link>
    </div>
  );
}
