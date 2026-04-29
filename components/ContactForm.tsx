"use client";

import { useState } from "react";
import type { Content } from "@/lib/getData";

type ContactFormProps = {
  form: Content["contactPage"]["form"];
};

export function ContactForm({ form }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-ink">
          {form.nameLabel}
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className="min-h-11 rounded-lg border border-stone-200 bg-soft px-4 text-base font-normal text-ink outline-none transition placeholder:text-stone-400 focus:border-clay focus:bg-white"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink">
          {form.emailLabel}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className="min-h-11 rounded-lg border border-stone-200 bg-soft px-4 text-base font-normal text-ink outline-none transition placeholder:text-stone-400 focus:border-clay focus:bg-white"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink">
          {form.messageLabel}
          <textarea
            name="message"
            required
            rows={6}
            placeholder={form.messagePlaceholder}
            className="min-h-36 resize-y rounded-lg border border-stone-200 bg-soft px-4 py-3 text-base font-normal text-ink outline-none transition placeholder:text-stone-400 focus:border-clay focus:bg-white"
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-clay"
        >
          {form.submitLabel}
        </button>
        {submitted && (
          <p className="rounded-lg bg-sage/10 px-4 py-3 text-sm font-medium text-stone-700">
            {form.successMessage}
          </p>
        )}
      </div>
    </form>
  );
}
