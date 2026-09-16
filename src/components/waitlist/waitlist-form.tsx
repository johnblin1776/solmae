"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export function WaitlistForm({
  source = "landing",
  variant = "hero",
}: {
  source?: string;
  variant?: "hero" | "page";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await response.json()) as { error?: string; message?: string; duplicate?: boolean };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus(data.duplicate ? "duplicate" : "success");
      setMessage(data.message ?? "You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div
        className="text-center"
        role="status"
        aria-live="polite"
      >
        <p className="font-serif text-[22px] text-ink">You&apos;re on the list.</p>
        <p className="mt-2 text-sm text-ink/55">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={variant === "hero" ? "w-full" : "w-full max-w-md"}>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end">
        <label className="flex-1 text-left">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="you@email.com"
            className="w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink/35 focus:border-ink"
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 pb-2.5 text-[12px] font-semibold tracking-[0.16em] text-coral uppercase transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "Joining…" : "Join Us"}
        </button>
      </div>
      {status === "error" ? (
        <p className="mt-3 text-left text-[13px] text-coral" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
