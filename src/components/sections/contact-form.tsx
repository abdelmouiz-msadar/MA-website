"use client";

import { useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ChevronRight } from "@/components/ui/icons";
import { contactInfo } from "@/lib/content/navigation";
import { needOptions } from "@/lib/content/contact";
import { cn } from "@/lib/utils";

type FormState = {
  nom: string;
  societe: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/15 aria-[invalid=true]:border-red-700";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<FormState>(() => {
    const requested = searchParams.get("sujet");
    const sujet = needOptions.some((o) => o.value === requested) ? (requested as string) : needOptions[0].value;
    return { nom: "", societe: "", email: "", telephone: "", sujet, message: "" };
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const update = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.nom.trim()) next.nom = "Votre nom est requis.";
    if (!values.email.trim()) next.email = "Votre email est requis.";
    else if (!emailPattern.test(values.email)) next.email = "Format d'email invalide.";
    if (!values.message.trim()) next.message = "Votre message est requis.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("idle");
      return;
    }

    const subjectLabel = needOptions.find((o) => o.value === values.sujet)?.label ?? values.sujet;
    const subject = `[Site web] ${subjectLabel} — ${values.nom}`;
    const bodyLines = [
      `Nom : ${values.nom}`,
      values.societe ? `Société : ${values.societe}` : null,
      `Email : ${values.email}`,
      values.telephone ? `Téléphone : ${values.telephone}` : null,
      `Sujet : ${subjectLabel}`,
      "",
      values.message,
    ].filter((line): line is string => line !== null);

    setStatus("ready");
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Nom" required error={errors.nom}>
          <input type="text" value={values.nom} onChange={update("nom")} className={fieldClass} aria-invalid={Boolean(errors.nom)} autoComplete="name" />
        </Field>
        <Field label="Société">
          <input type="text" value={values.societe} onChange={update("societe")} className={fieldClass} autoComplete="organization" />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input type="email" value={values.email} onChange={update("email")} className={fieldClass} aria-invalid={Boolean(errors.email)} autoComplete="email" />
        </Field>
        <Field label="Téléphone">
          <input type="tel" value={values.telephone} onChange={update("telephone")} className={fieldClass} autoComplete="tel" />
        </Field>
      </div>

      <Field label="Sujet">
        <select value={values.sujet} onChange={update("sujet")} className={cn(fieldClass, "cursor-pointer")}>
          {needOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" required error={errors.message}>
        <textarea value={values.message} onChange={update("message")} rows={6} className={cn(fieldClass, "resize-y")} aria-invalid={Boolean(errors.message)} />
      </Field>

      <div className="flex flex-col gap-4 pt-2">
        <button
          type="submit"
          className="group inline-flex min-h-12 w-fit items-center gap-2 bg-brand px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-dark"
        >
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          Envoyer le message
        </button>
        <p className="text-[14px] leading-relaxed text-muted" aria-live="polite">
          {status === "ready"
            ? `Votre client email va s'ouvrir avec votre message pré-rempli, à destination de ${contactInfo.email}.`
            : "Ce formulaire ouvre votre client email avec un message pré-rempli — aucun envoi automatique n'est encore connecté à ce site."}
        </p>
      </div>
    </form>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[15px] font-bold text-navy">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </span>
      {children}
      {error ? <span className="text-[14px] text-red-700">{error}</span> : null}
    </label>
  );
}
