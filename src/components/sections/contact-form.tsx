"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ChoiceChip, FieldsetLegend, FloatingField } from "@/components/ui/form-fields";
import { Reveal } from "@/components/ui/reveal";
import { contactForm, isNeed, needOptions } from "@/lib/content/contact";
import { contactInfo } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

type Values = { nom: string; societe: string; email: string; telephone: string; site: string; message: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empty: Values = { nom: "", societe: "", email: "", telephone: "", site: "", message: "" };

/** Reads `?sujet=` so links like /contact?sujet=cvc open the form with that need already ticked. */
export function ContactFormFromUrl() {
  const sujet = useSearchParams().get("sujet");
  return <ContactForm initialNeeds={isNeed(sujet) ? [sujet] : []} />;
}

export function ContactForm({ initialNeeds = [] }: { initialNeeds?: string[] }) {
  const [values, setValues] = useState<Values>(empty);
  const [needs, setNeeds] = useState<string[]>(initialNeeds);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const noticeId = useId();

  const setField = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const toggleNeed = (value: string) =>
    setNeeds((current) => (current.includes(value) ? current.filter((v) => v !== value) : [...current, value]));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.nom.trim()) e.nom = contactForm.errors.nom;
    if (!values.email.trim()) e.email = contactForm.errors.email;
    else if (!emailPattern.test(values.email.trim())) e.email = contactForm.errors.emailFormat;
    if (!values.message.trim()) e.message = contactForm.errors.message;
    return e;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus(contactForm.errors.summary);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    const needLabels = needOptions.filter((o) => needs.includes(o.value)).map((o) => o.label);
    const subject = `[Site web] ${needLabels.length ? needLabels.join(", ") : contactForm.sections.project} — ${values.nom.trim()}`;
    const body = [
      `${contactForm.fields.nom} : ${values.nom.trim()}`,
      values.societe.trim() ? `${contactForm.fields.societe} : ${values.societe.trim()}` : null,
      `${contactForm.fields.email} : ${values.email.trim()}`,
      values.telephone.trim() ? `${contactForm.fields.telephone} : ${values.telephone.trim()}` : null,
      needLabels.length ? `${contactForm.needsLegend} : ${needLabels.join(", ")}` : null,
      values.site.trim() ? `${contactForm.fields.site} : ${values.site.trim()}` : null,
      "",
      values.message.trim(),
    ].filter((line): line is string => line !== null);

    setStatus(contactForm.ready);
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join("\n"))}`;
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby={noticeId} className="flex flex-col gap-14">
      <Reveal as="p" className="-mb-6 text-sm text-muted">
        {contactForm.required.split("*")[0]}
        <span className="text-accent">*</span>
        {contactForm.required.split("*")[1]}
      </Reveal>

      <Reveal as="fieldset" className="min-w-0">
        <FieldsetLegend>{contactForm.sections.contact}</FieldsetLegend>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <FloatingField label={contactForm.fields.nom} required error={errors.nom}>
            {(props) => <input {...props} type="text" name="nom" autoComplete="name" maxLength={120} value={values.nom} onChange={setField("nom")} />}
          </FloatingField>
          <FloatingField label={contactForm.fields.societe}>
            {(props) => (
              <input {...props} type="text" name="societe" autoComplete="organization" maxLength={120} value={values.societe} onChange={setField("societe")} />
            )}
          </FloatingField>
          <FloatingField label={contactForm.fields.email} required error={errors.email}>
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
          <FloatingField label={contactForm.fields.telephone}>
            {(props) => <input {...props} type="tel" name="telephone" autoComplete="tel" maxLength={40} value={values.telephone} onChange={setField("telephone")} />}
          </FloatingField>
        </div>
      </Reveal>

      <Reveal as="fieldset" className="min-w-0">
        <FieldsetLegend>{contactForm.sections.project}</FieldsetLegend>
        <fieldset>
          <legend className="text-sm font-medium text-text">
            {contactForm.needsLegend} <span className="font-normal text-muted">{contactForm.needsHint}</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {needOptions.map((opt) => (
              <ChoiceChip
                key={opt.value}
                name="sujet"
                value={opt.value}
                label={opt.label}
                checked={needs.includes(opt.value)}
                onToggle={() => toggleNeed(opt.value)}
              />
            ))}
          </div>
        </fieldset>
        <FloatingField label={contactForm.fields.site} className="mt-8">
          {(props) => <input {...props} type="text" name="site" maxLength={200} value={values.site} onChange={setField("site")} />}
        </FloatingField>
      </Reveal>

      <Reveal as="fieldset" className="min-w-0">
        <FieldsetLegend>{contactForm.sections.message}</FieldsetLegend>
        <FloatingField
          label={contactForm.fields.message}
          required
          error={errors.message}
          hint={contactForm.counter(values.message.length, contactForm.messageMax)}
        >
          {(props) => (
            <textarea {...props} name="message" rows={5} maxLength={contactForm.messageMax} value={values.message} onChange={setField("message")} className={cn(props.className, "resize-y")} />
          )}
        </FloatingField>
      </Reveal>

      <Reveal className="-mt-4 flex flex-col gap-5">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button type="submit" className="sm:self-start">
            {contactForm.submit}
          </Button>
          <p role="status" className="text-sm text-accent">
            {status}
          </p>
        </div>
        <p id={noticeId} className="max-w-xl text-sm text-muted">
          {contactForm.notice(contactInfo.email)}
        </p>
      </Reveal>
    </form>
  );
}
