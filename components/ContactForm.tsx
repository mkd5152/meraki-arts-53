"use client";

import { type FormEvent, useEffect, useState } from "react";
import type { ArtForm, Content } from "@/lib/getData";

type ContactFormProps = {
  form: Content["contactPage"]["form"];
  delivery: Content["contactPage"]["delivery"];
  artForms: ArtForm[];
};

type SubmissionStatus = "idle" | "sending" | "sent" | "fallback" | "error";

const fieldValue = (formData: FormData, field: string) =>
  String(formData.get(field) ?? "").trim();

export function ContactForm({ form, delivery, artForms }: ContactFormProps) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [selectedMedium, setSelectedMedium] = useState("");

  useEffect(() => {
    const medium = new URLSearchParams(window.location.search).get("medium");
    const matchedArtForm = artForms.find((artForm) => artForm.title === medium);

    if (matchedArtForm) {
      setSelectedMedium(matchedArtForm.title);
    }
  }, [artForms]);

  const statusMessage =
    status === "sent"
      ? delivery.successMessage
      : status === "fallback"
        ? delivery.fallbackMessage
        : status === "error"
          ? delivery.errorMessage
          : "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const currentForm = event.currentTarget;
    const formData = new FormData(currentForm);
    const name = fieldValue(formData, "name");
    const email = fieldValue(formData, "email");
    const medium = fieldValue(formData, "medium") || form.mediumPlaceholder;
    const timeline = fieldValue(formData, "timeline") || "-";
    const occasion = fieldValue(formData, "occasion") || "-";
    const budget = fieldValue(formData, "budget") || "-";
    const message = fieldValue(formData, "message");
    const requestMessage = [
      delivery.whatsappIntro,
      "",
      `${form.nameLabel}: ${name}`,
      `${form.emailLabel}: ${email}`,
      `${form.mediumLabel}: ${medium}`,
      `${form.occasionLabel}: ${occasion}`,
      `${form.timelineLabel}: ${timeline}`,
      `${form.budgetLabel}: ${budget}`,
      "",
      `${form.messageLabel}:`,
      message
    ].join("\n");
    const emailPayload = new FormData();

    emailPayload.append("_subject", delivery.emailSubject);
    emailPayload.append("_template", "table");
    emailPayload.append("_captcha", "false");
    emailPayload.append(form.nameLabel, name);
    emailPayload.append(form.emailLabel, email);
    emailPayload.append(form.mediumLabel, medium);
    emailPayload.append(form.occasionLabel, occasion);
    emailPayload.append(form.timelineLabel, timeline);
    emailPayload.append(form.budgetLabel, budget);
    emailPayload.append(form.messageLabel, message);
    emailPayload.append("Formatted request", requestMessage);

    setStatus("sending");

    const whatsappUrl = `${delivery.whatsappHref}?text=${encodeURIComponent(
      requestMessage
    )}`;
    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!whatsappWindow) {
      window.location.href = whatsappUrl;
    }

    try {
      const response = await fetch(delivery.emailEndpoint, {
        method: "POST",
        body: emailPayload,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Email request failed");
      }

      setStatus("sent");
      currentForm.reset();
      setSelectedMedium("");
    } catch (error) {
      console.error(error);
      setStatus("fallback");
    }
  };

  return (
    <form
      className="rounded-[1.5rem] border border-line bg-panel p-5 shadow-sm sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5">
        {form.reassurance && (
          <p className="rounded-2xl border border-line bg-soft px-4 py-3 text-sm font-medium leading-6 text-muted">
            {form.reassurance}
          </p>
        )}

        <fieldset className="grid gap-5">
          {form.sections?.[0] && (
            <div>
              <legend className="text-base font-semibold text-ink">
                {form.sections[0].title}
              </legend>
              <p className="mt-1 text-sm leading-6 text-muted">
                {form.sections[0].description}
              </p>
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
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
          </div>
        </fieldset>

        <fieldset className="grid gap-5 border-t border-line pt-5">
          {form.sections?.[1] && (
            <div>
              <legend className="text-base font-semibold text-ink">
                {form.sections[1].title}
              </legend>
              <p className="mt-1 text-sm leading-6 text-muted">
                {form.sections[1].description}
              </p>
            </div>
          )}
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
        </fieldset>

        <fieldset className="grid gap-5 border-t border-line pt-5">
          {form.sections?.[2] && (
            <div>
              <legend className="text-base font-semibold text-ink">
                {form.sections[2].title}
              </legend>
              <p className="mt-1 text-sm leading-6 text-muted">
                {form.sections[2].description}
              </p>
            </div>
          )}
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
        </fieldset>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-clay disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
        >
          {status === "sending" ? form.sendingLabel : form.submitLabel}
        </button>
        {statusMessage && (
          <p
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              status === "sent"
                ? "bg-sage/10 text-ink"
                : "bg-clay/10 text-ink"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}
