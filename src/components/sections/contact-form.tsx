"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
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

const initialState: FormState = {
  nom: "",
  societe: "",
  email: "",
  telephone: "",
  sujet: needOptions[0].value,
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full border-b border-ink/20 bg-transparent py-3 text-[15px] text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-steel";

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const update = (field: keyof FormState) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
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

    const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    setStatus("ready");
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Nom" error={errors.nom}>
          <input
            type="text"
            value={values.nom}
            onChange={update("nom")}
            className={inputClass}
            aria-invalid={Boolean(errors.nom)}
            autoComplete="name"
          />
        </Field>
        <Field label="Société">
          <input
            type="text"
            value={values.societe}
            onChange={update("societe")}
            className={inputClass}
            autoComplete="organization"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={update("email")}
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
          />
        </Field>
        <Field label="Téléphone">
          <input
            type="tel"
            value={values.telephone}
            onChange={update("telephone")}
            className={inputClass}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label="Sujet">
        <select value={values.sujet} onChange={update("sujet")} className={cn(inputClass, "cursor-pointer")}>
          {needOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          value={values.message}
          onChange={update("message")}
          rows={5}
          className={cn(inputClass, "resize-none")}
          aria-invalid={Boolean(errors.message)}
        />
      </Field>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="inline-flex w-fit items-center gap-3 bg-ink px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.04em] text-white transition-colors hover:bg-steel"
        >
          Envoyer le message
        </button>
        <p className="text-[13px] text-ink-soft">
          {status === "ready"
            ? "Votre client email va s'ouvrir avec votre message pré-rempli, à destination de " +
              contactInfo.email +
              "."
            : "Ce formulaire ouvre votre client email avec un message pré-rempli — aucun envoi automatique n'est encore connecté à ce site."}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">{label}</span>
      {children}
      {error ? <span className="text-[12px] text-red-700">{error}</span> : null}
    </label>
  );
}
