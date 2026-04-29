"use client";

import { useEffect, useState } from "react";
import type { ArtForm, Content } from "@/lib/getData";

type ContactFormProps = {
  form: Content["contactPage"]["form"];
  artForms: ArtForm[];
};

export function ContactForm({ form, artForms }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedMedium, setSelectedMedium] = useState("");

  useEffect(() => {
    const medium = new URLSearchParams(window.location.search).get("medium");
    const matchedArtForm = artForms.find((artForm) => artForm.title === medium);

    if (matchedArtForm) {
      setSelectedMedium(matchedArtForm.title);
    }
  }, [artForms]);

  return (
    <form
      className="rounded-[1.5rem] border border-line bg-panel p-5 shadow-sm sm:p-6"
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
            className="min-h-11 rounded-xl border border-line bg-soft px-4 text-base font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-clay focus:bg-panel"
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
            className="min-h-11 rounded-xl border border-line bg-soft px-4 text-base font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-clay focus:bg-panel"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-ink">
            {form.mediumLabel}
            <select
              name="medium"
              value={selectedMedium}
              onChange={(event) => setSelectedMedium(event.target.value)}
              className="min-h-11 rounded-xl border border-line bg-soft px-4 text-base font-normal text-ink outline-none transition focus:border-clay focus:bg-panel"
            >
              <option value="" disabled>
                {form.mediumPlaceholder}
              </option>
              {artForms.map((artForm) => (
                <option key={artForm.id} value={artForm.title}>
                  {artForm.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-ink">
            {form.timelineLabel}
            <input
              name="timeline"
              type="text"
              placeholder={form.timelinePlaceholder}
              className="min-h-11 rounded-xl border border-line bg-soft px-4 text-base font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-clay focus:bg-panel"
            />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-ink">
            {form.occasionLabel}
            <input
              name="occasion"
              type="text"
              placeholder={form.occasionPlaceholder}
              className="min-h-11 rounded-xl border border-line bg-soft px-4 text-base font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-clay focus:bg-panel"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-ink">
            {form.budgetLabel}
            <input
              name="budget"
              type="text"
              placeholder={form.budgetPlaceholder}
              className="min-h-11 rounded-xl border border-line bg-soft px-4 text-base font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-clay focus:bg-panel"
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-ink">
          {form.messageLabel}
          <textarea
            name="message"
            required
            rows={6}
            placeholder={form.messagePlaceholder}
            className="min-h-36 resize-y rounded-xl border border-line bg-soft px-4 py-3 text-base font-normal text-ink outline-none transition placeholder:text-muted/70 focus:border-clay focus:bg-panel"
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-clay"
        >
          {form.submitLabel}
        </button>
        {submitted && (
          <p className="rounded-xl bg-sage/10 px-4 py-3 text-sm font-medium text-ink">
            {form.successMessage}
          </p>
        )}
      </div>
    </form>
  );
}
