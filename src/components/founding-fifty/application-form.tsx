"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

const fields = {
  name: "",
  email: "",
  whatYouKnow: "",
  whatYouWantToKnow: "",
};

export function FoundingFiftyForm() {
  const [values, setValues] = useState(fields);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function update(name: keyof typeof fields, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (status === "error") setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/founding-50", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { error?: string; message?: string; duplicate?: boolean };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus(data.duplicate ? "duplicate" : "success");
      setMessage(data.message ?? "Your application is in.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div className="rounded-[28px] bg-white px-8 py-12 text-center shadow-[0_20px_60px_rgba(26,26,26,0.06)]" role="status">
        <p className="font-serif text-[28px] text-ink">Thank you.</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-ink/55">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name">
          <input
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
            placeholder="you@email.com"
          />
        </Field>
      </div>
      <Field label="What do you know that other women should know?">
        <textarea
          required
          rows={4}
          value={values.whatYouKnow}
          onChange={(event) => update("whatYouKnow", event.target.value)}
          className={fieldClass}
          placeholder="A skill, a recommendation, a way through something."
        />
      </Field>
      <Field label="What do you want to know?">
        <textarea
          required
          rows={4}
          value={values.whatYouWantToKnow}
          onChange={(event) => update("whatYouWantToKnow", event.target.value)}
          className={fieldClass}
          placeholder="The question you keep asking the people you trust."
        />
      </Field>
      {status === "error" ? (
        <p className="text-[13px] text-coral" role="alert">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[#333] disabled:opacity-50 sm:min-h-0"
      >
        {status === "loading" ? "Sending…" : "Apply to the Founding 50"}
      </button>
    </form>
  );
}

const fieldClass =
  "w-full rounded-[2px] border-[1.5px] border-lightgray bg-white px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-ink";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-[11px] font-bold tracking-[0.08em] text-ink uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
