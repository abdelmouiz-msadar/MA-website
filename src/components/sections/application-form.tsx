"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ChoiceChip, FieldsetLegend, FloatingField } from "@/components/ui/form-fields";
import { Reveal } from "@/components/ui/reveal";
import { applicationEmail, applicationForm, jobOffers } from "@/lib/content/careers";
import { expertises } from "@/lib/content/expertises";
import { cn } from "@/lib/utils";

type Values = { nom: string; email: string; telephone: string; ville: string; poste: string; message: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const f = applicationForm;

/** Reads `?poste=` so "Postuler" links open the form with that offer already filled in. */
export function ApplicationFormFromUrl() {
  const slug = useSearchParams().get("poste");
  const offer = jobOffers.find((o) => o.slug === slug);
  // Keyed so that choosing another offer on the same page resets the form with it.
  return <ApplicationForm key={offer?.slug ?? ""} initialPosition={offer?.title ?? ""} />;
}

export function ApplicationForm({ initialPosition = "" }: { initialPosition?: string }) {
  const [values, setValues] = useState<Values>({ nom: "", email: "", telephone: "", ville: "", poste: initialPosition, message: "" });
  const [domains, setDomains] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const noticeId = useId();

  const setField = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const toggleDomain = (name: string) =>
    setDomains((current) => (current.includes(name) ? current.filter((d) => d !== name) : [...current, name]));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.nom.trim()) e.nom = f.errors.nom;
    if (!values.email.trim()) e.email = f.errors.email;
    else if (!emailPattern.test(values.email.trim())) e.email = f.errors.emailFormat;
    if (!values.message.trim()) e.message = f.errors.message;
    return e;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus(f.errors.summary);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    const position = values.poste.trim() || (domains.length ? domains.join(", ") : f.spontaneous);
    const subject = `${f.subjectPrefix} ${position} — ${values.nom.trim()}`;
    const body = [
      `${f.fields.nom} : ${values.nom.trim()}`,
      `${f.fields.email} : ${values.email.trim()}`,
      values.telephone.trim() ? `${f.fields.telephone} : ${values.telephone.trim()}` : null,
      values.ville.trim() ? `${f.fields.ville} : ${values.ville.trim()}` : null,
      values.poste.trim() ? `${f.fields.poste} : ${values.poste.trim()}` : null,
      domains.length ? `${f.domainsLegend} : ${domains.join(", ")}` : null,
      "",
      values.message.trim(),
      "",
      f.cvReminder,
    ].filter((line): line is string => line !== null);

    setStatus(f.ready);
    window.location.href = `mailto:${applicationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join("\n"))}`;
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby={noticeId} className="flex flex-col gap-14">
      <Reveal as="p" className="-mb-6 text-sm text-muted">
        {f.required.split("*")[0]}
        <span className="text-accent">*</span>
        {f.required.split("*")[1]}
      </Reveal>

      <Reveal as="fieldset" className="min-w-0">
        <FieldsetLegend>{f.sections.identity}</FieldsetLegend>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <FloatingField label={f.fields.nom} required error={errors.nom}>
            {(props) => <input {...props} type="text" name="nom" autoComplete="name" maxLength={120} value={values.nom} onChange={setField("nom")} />}
          </FloatingField>
          <FloatingField label={f.fields.email} required error={errors.email}>
            {(props) => (
              <input
                {...props}
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                maxLength={254}
                value={values.email}
                onChange={setField("email")}
              />
            )}
          </FloatingField>
          <FloatingField label={f.fields.telephone}>
            {(props) => <input {...props} type="tel" name="telephone" autoComplete="tel" maxLength={40} value={values.telephone} onChange={setField("telephone")} />}
          </FloatingField>
          <FloatingField label={f.fields.ville}>
            {(props) => (
              <input {...props} type="text" name="ville" autoComplete="address-level2" maxLength={80} value={values.ville} onChange={setField("ville")} />
            )}
          </FloatingField>
        </div>
      </Reveal>

      <Reveal as="fieldset" className="min-w-0">
        <FieldsetLegend>{f.sections.position}</FieldsetLegend>
        <FloatingField label={f.fields.poste}>
          {(props) => <input {...props} type="text" name="poste" maxLength={120} value={values.poste} onChange={setField("poste")} />}
        </FloatingField>
        <fieldset className="mt-8">
          <legend className="text-sm font-medium text-text">
            {f.domainsLegend} <span className="font-normal text-muted">{f.domainsHint}</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {expertises.map((exp) => (
              <ChoiceChip
                key={exp.slug}
                name="domaine"
                value={exp.slug}
                label={exp.name}
                checked={domains.includes(exp.name)}
                onToggle={() => toggleDomain(exp.name)}
              />
            ))}
          </div>
        </fieldset>
      </Reveal>

      <Reveal as="fieldset" className="min-w-0">
        <FieldsetLegend>{f.sections.message}</FieldsetLegend>
        <FloatingField label={f.fields.message} required error={errors.message} hint={f.counter(values.message.length, f.messageMax)}>
          {(props) => (
            <textarea
              {...props}
              name="message"
              rows={6}
              maxLength={f.messageMax}
              value={values.message}
              onChange={setField("message")}
              className={cn(props.className, "resize-y")}
            />
          )}
        </FloatingField>
      </Reveal>

      <Reveal className="-mt-4 flex flex-col gap-5">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button type="submit" className="sm:self-start">
            {f.submit}
          </Button>
          <p role="status" className="text-sm text-accent">
            {status}
          </p>
        </div>
        <p id={noticeId} className="max-w-xl text-sm text-muted">
          {f.notice(applicationEmail)}
        </p>
      </Reveal>
    </form>
  );
}
