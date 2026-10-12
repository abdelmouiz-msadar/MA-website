"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { ArrowLeft, ArrowRight, CheckIcon, ClockIcon, GridIcon, PhoneIcon, ShieldIcon } from "@/components/ui/icons";
import { contactBuilder, isNeed, needImage, needOptions } from "@/lib/content/contact";
import { contactInfo } from "@/lib/content/navigation";
import { expertises } from "@/lib/content/expertises";
import { footerContent, homeSections, keyFigures } from "@/lib/content/pages";
import { cn } from "@/lib/utils";

type Values = { sujet: string; message: string; nom: string; societe: string; email: string; telephone: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const STEPS = contactBuilder.steps;
const LAST = STEPS.length - 1;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const domainsFigure = keyFigures.items.find((item) => item.value === String(expertises.length));

const fieldClass =
  "w-full border border-line bg-white px-4 py-3.5 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgb(30_100_137/0.12)] aria-[invalid=true]:border-red-700";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Reads `?sujet=` so links like /contact?sujet=cvc open the builder with that need already chosen. */
export function ContactBuilderFromUrl() {
  const params = useSearchParams();
  return <ContactBuilder initialNeed={params.get("sujet")} />;
}

export function ContactBuilder({ initialNeed = null }: { initialNeed?: string | null }) {
  const startNeed = isNeed(initialNeed) ? initialNeed : "";
  const [values, setValues] = useState<Values>({ sujet: startNeed, message: "", nom: "", societe: "", email: "", telephone: "" });
  const [step, setStep] = useState(startNeed ? 1 : 0);
  const [reached, setReached] = useState(startNeed ? 1 : 0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animate, setAnimate] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);
  const [height, setHeight] = useState<number>();

  const needLabel = needOptions.find((o) => o.value === values.sujet)?.label ?? "";

  // Smoothly morph the card height between steps.
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  // After a user-initiated step change: move focus to the new step title and keep the card in view.
  useEffect(() => {
    if (!animate) return;
    headingRef.current?.focus({ preventScroll: true });
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 72) rootRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }, [step, done, animate]);

  const setField = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const goTo = useCallback(
    (target: number) => {
      window.clearTimeout(advanceTimer.current);
      setDirection(target >= step ? "forward" : "back");
      setAnimate(true);
      setStep(target);
      setReached((r) => Math.max(r, target));
      setErrors({});
    },
    [step],
  );

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0 && !values.sujet) e.sujet = contactBuilder.errors.need;
    if (s === 1 && !values.message.trim()) e.message = contactBuilder.errors.message;
    if (s === 2) {
      if (!values.nom.trim()) e.nom = contactBuilder.errors.name;
      if (!values.email.trim()) e.email = contactBuilder.errors.email;
      else if (!emailPattern.test(values.email)) e.email = contactBuilder.errors.emailFormat;
    }
    return e;
  };

  const showErrors = (e: Errors) => {
    setErrors(e);
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], input[name="sujet"]')?.focus();
    });
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) return showErrors(e);
    goTo(Math.min(step + 1, LAST));
  };

  // Pointer clicks on a need tile advance automatically; keyboard users confirm with "Continuer".
  const onTileClick = (e: MouseEvent) => {
    if (e.detail === 0) return;
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => goTo(1), 420);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (done) return;
    if (step < LAST) return next();
    const errs = validate(LAST);
    if (Object.keys(errs).length) return showErrors(errs);

    const subject = `[Site web] ${needLabel} — ${values.nom}`;
    const bodyLines = [
      `Nom : ${values.nom}`,
      values.societe ? `Société : ${values.societe}` : null,
      `Email : ${values.email}`,
      values.telephone ? `Téléphone : ${values.telephone}` : null,
      `Sujet : ${needLabel}`,
      "",
      values.message,
    ].filter((line): line is string => line !== null);

    setDirection("forward");
    setAnimate(true);
    setDone(true);
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  };

  const restart = () => {
    setValues({ sujet: "", message: "", nom: "", societe: "", email: "", telephone: "" });
    setReached(0);
    setDone(false);
    setDirection("back");
    setAnimate(true);
    setStep(0);
    setErrors({});
  };

  const stepAnimation = animate ? (direction === "forward" ? "step-in-forward" : "step-in-back") : "";

  return (
    <div ref={rootRef} className="grid scroll-mt-28 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-6 shadow-[0_40px_90px_-45px_rgb(8_32_45/0.45)] sm:p-10"
      >
        <Progress step={step} reached={reached} done={done} onSelect={goTo} />

        <p aria-live="polite" className="sr-only">
          {done ? contactBuilder.successTitle : `${contactBuilder.stepCounter(step + 1, STEPS.length)} — ${STEPS[step].label}`}
        </p>

        <div
          style={height ? { height } : undefined}
          className="-mx-1 overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
        >
          <div ref={innerRef} className="px-1 pt-9 pb-1">
            <div key={done ? "done" : step} className={stepAnimation}>
              {done ? (
                <Success headingRef={headingRef} onRestart={restart} />
              ) : (
                <>
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand">
                    {contactBuilder.stepCounter(step + 1, STEPS.length)}
                  </p>
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-tight text-navy outline-none"
                  >
                    {STEPS[step].title}
                  </h2>

                  <div className="mt-8">
                    {step === 0 ? (
                      <NeedTiles
                        value={values.sujet}
                        error={errors.sujet}
                        onChange={(v) => setValues((s) => ({ ...s, sujet: v }))}
                        onTileClick={onTileClick}
                        onConfirm={next}
                      />
                    ) : null}

                    {step === 1 ? (
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 border border-line bg-wash p-3 pr-5">
                          <span className="relative h-14 w-14 shrink-0 overflow-hidden bg-navy-deep">
                            <Image src={needImage(values.sujet)} alt="" fill sizes="56px" className="object-cover" />
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-[13px] text-muted">{STEPS[0].label}</span>
                            <span className="truncate text-[17px] font-bold text-navy">{needLabel}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => goTo(0)}
                            className="shrink-0 text-[14px] font-bold text-brand underline-offset-4 hover:underline"
                          >
                            {contactBuilder.edit}
                          </button>
                        </div>
                        <FormField label="Message" required error={errors.message}>
                          <textarea
                            value={values.message}
                            onChange={setField("message")}
                            rows={7}
                            placeholder={contactBuilder.messagePlaceholder}
                            aria-invalid={Boolean(errors.message)}
                            className={cn(fieldClass, "resize-y")}
                          />
                        </FormField>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <FormField label="Nom" required error={errors.nom}>
                            <input type="text" value={values.nom} onChange={setField("nom")} autoComplete="name" aria-invalid={Boolean(errors.nom)} className={fieldClass} />
                          </FormField>
                          <FormField label="Société">
                            <input type="text" value={values.societe} onChange={setField("societe")} autoComplete="organization" className={fieldClass} />
                          </FormField>
                          <FormField label="Email" required error={errors.email}>
                            <input type="email" value={values.email} onChange={setField("email")} autoComplete="email" aria-invalid={Boolean(errors.email)} className={fieldClass} />
                          </FormField>
                          <FormField label="Téléphone">
                            <input type="tel" value={values.telephone} onChange={setField("telephone")} autoComplete="tel" className={fieldClass} />
                          </FormField>
                        </div>
                        <p className="text-[14px] leading-relaxed text-muted">{contactBuilder.notice.idle}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-9 flex items-center justify-between gap-4 border-t border-line pt-6">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        className="group inline-flex min-h-12 items-center gap-2 text-[15px] font-bold text-navy transition-colors hover:text-brand"
                      >
                        <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
                        {contactBuilder.back}
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      type={step === LAST ? "submit" : "button"}
                      onClick={step === LAST ? undefined : next}
                      className="group inline-flex min-h-12 items-center gap-3 bg-brand px-6 py-3 text-[15px] font-bold text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98]"
                    >
                      {step === LAST ? contactBuilder.submit : contactBuilder.next}
                      <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>

      <Summary values={values} needLabel={needLabel} step={done ? STEPS.length : step} reached={done ? -1 : reached} onSelect={goTo} />
    </div>
  );
}

function Progress({ step, reached, done, onSelect }: { step: number; reached: number; done: boolean; onSelect: (s: number) => void }) {
  return (
    <ol className="grid grid-cols-3 gap-3">
      {STEPS.map((s, i) => {
        const state = done || i < step ? "done" : i === step ? "current" : "todo";
        const clickable = !done && i <= reached && i !== step;
        return (
          <li key={s.label}>
            <button
              type="button"
              disabled={!clickable}
              onClick={() => onSelect(i)}
              aria-current={state === "current" ? "step" : undefined}
              className={cn("group flex w-full flex-col gap-3 text-left", clickable ? "cursor-pointer" : "cursor-default")}
            >
              <span className="relative h-1 w-full overflow-hidden bg-line">
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                    state === "todo" ? "w-0" : "w-full",
                  )}
                />
              </span>
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center text-[13px] font-bold transition-colors duration-300",
                    state === "todo" ? "bg-wash text-muted" : "bg-brand text-white",
                  )}
                >
                  {state === "done" ? <CheckIcon size={15} strokeWidth={2.5} /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-[13px] font-bold uppercase tracking-[0.08em] transition-colors duration-300 sm:inline",
                    state === "todo" ? "text-muted" : "text-navy",
                    clickable && "group-hover:text-brand",
                  )}
                >
                  {s.label}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function NeedTiles({
  value,
  error,
  onChange,
  onTileClick,
  onConfirm,
}: {
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onTileClick: (e: MouseEvent) => void;
  /** Enter confirms the keyboard selection (radios don't trigger implicit form submission). */
  onConfirm: () => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{STEPS[0].title}</legend>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {needOptions.map((opt, i) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              onClick={onTileClick}
              style={{ animationDelay: `${i * 45}ms` }}
              className="tile-in group relative block aspect-[4/3] cursor-pointer overflow-hidden bg-navy-deep outline-offset-2 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand md:aspect-[16/9] lg:aspect-[4/5]"
            >
              <input
                type="radio"
                name="sujet"
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onConfirm();
                  }
                }}
                aria-describedby={error ? "need-error" : undefined}
                className="sr-only"
              />
              <Image
                src={needImage(opt.value)}
                alt=""
                fill
                sizes="(min-width: 1024px) 170px, 50vw"
                className={cn(
                  "object-cover transition-transform duration-700 ease-out group-hover:scale-110",
                  selected && "scale-110",
                )}
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_32_45/0.05)_25%,rgb(8_32_45/0.88)_100%)]" />
              <span className={cn("absolute inset-0 bg-brand/50 transition-opacity duration-300", selected ? "opacity-100" : "opacity-0")} />
              <span
                aria-hidden
                className={cn(
                  "absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center bg-white text-brand transition-[opacity,transform] duration-300",
                  selected ? "scale-100 opacity-100" : "scale-50 opacity-0",
                )}
              >
                <CheckIcon size={16} strokeWidth={2.5} />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 text-[14px] leading-snug font-bold text-white sm:text-[15px]">{opt.label}</span>
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 border-[3px] transition-colors duration-300",
                  selected ? "border-brand-light" : "border-transparent",
                )}
              />
            </label>
          );
        })}
      </div>
      {error ? (
        <p id="need-error" role="alert" className="mt-4 text-[14px] text-red-700">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function FormField({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
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

function Success({ headingRef, onRestart }: { headingRef: RefObject<HTMLHeadingElement | null>; onRestart: () => void }) {
  return (
    <div className="flex flex-col items-start gap-6 pb-2">
      <svg aria-hidden width="64" height="64" viewBox="0 0 52 52" className="text-brand">
        <circle className="draw-circle" cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path
          className="draw-check"
          d="M15 27l7 7 15-15"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2 ref={headingRef} tabIndex={-1} className="text-[clamp(1.75rem,2.8vw,2.375rem)] font-bold leading-tight text-navy outline-none">
        {contactBuilder.successTitle}
      </h2>
      <p className="max-w-[54ch] text-[17px] leading-relaxed text-ink/85">{contactBuilder.notice.ready(contactInfo.email)}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="text-[15px] text-muted">{contactBuilder.orCall}</span>
        <a href={`tel:${contactInfo.phoneHref}`} className="inline-flex items-center gap-2 text-[17px] font-bold text-brand hover:text-brand-dark">
          <PhoneIcon size={18} />
          {contactInfo.phone}
        </a>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="mt-2 inline-flex min-h-12 items-center gap-2 border border-brand px-5 py-3 text-[15px] font-bold text-brand transition-colors hover:bg-brand hover:text-white"
      >
        <ArrowLeft size={18} />
        {contactBuilder.restart}
      </button>
    </div>
  );
}

function Summary({
  values,
  needLabel,
  step,
  reached,
  onSelect,
}: {
  values: Values;
  needLabel: string;
  step: number;
  reached: number;
  onSelect: (s: number) => void;
}) {
  const contactLines = [values.nom, values.societe, values.email, values.telephone].filter((v) => v.trim());
  const rows: { label: string; filled: boolean; content: ReactNode }[] = [
    {
      label: STEPS[0].label,
      filled: Boolean(values.sujet),
      content: values.sujet ? (
        <span className="flex items-center gap-3">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden">
            <Image src={needImage(values.sujet)} alt="" fill sizes="40px" className="object-cover" />
          </span>
          {needLabel}
        </span>
      ) : null,
    },
    {
      label: STEPS[1].label,
      filled: Boolean(values.message.trim()),
      content: values.message.trim() ? <span className="line-clamp-3 break-words">{values.message}</span> : null,
    },
    {
      label: STEPS[2].label,
      filled: contactLines.length > 0,
      content: contactLines.length ? (
        <span className="flex flex-col break-words">
          {contactLines.map((line, i) => (
            <span key={`${i}-${line}`}>{line}</span>
          ))}
        </span>
      ) : null,
    },
  ];

  return (
    <aside aria-label={contactBuilder.summaryTitle} className="bg-deep p-7 text-white sm:p-9 lg:sticky lg:top-28">
      <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand-light">{contactBuilder.summaryTitle}</p>
      <dl className="mt-5">
        {rows.map((row, i) => {
          const active = i === step;
          const editable = i <= reached && i !== step;
          return (
            <div
              key={row.label}
              className={cn(
                "border-l-2 py-4 pl-4 transition-colors duration-300",
                active ? "border-brand-light" : "border-white/15",
              )}
            >
              <dt className="flex items-center justify-between gap-3 text-[13px] text-white/60">
                {row.label}
                {editable ? (
                  <button type="button" onClick={() => onSelect(i)} className="text-[13px] font-bold text-brand-light hover:text-white">
                    {contactBuilder.edit}
                  </button>
                ) : null}
              </dt>
              <dd className={cn("mt-1.5 text-[16px] font-bold transition-colors duration-300", row.filled ? "text-white" : "text-white/35")}>
                {row.filled ? row.content : contactBuilder.summaryEmpty}
              </dd>
            </div>
          );
        })}
      </dl>

      <ul className="mt-7 flex flex-col gap-4 border-t border-white/15 pt-7 text-[15px] leading-snug text-white/85">
        <li className="flex items-start gap-3">
          <ClockIcon size={20} className="shrink-0 text-brand-light" />
          <span>
            {homeSections.maintenance.availabilityLabel} <strong className="text-white">{homeSections.maintenance.availabilityValue}</strong>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <ShieldIcon size={20} className="shrink-0 text-brand-light" />
          <span>{footerContent.certifications}</span>
        </li>
        {domainsFigure ? (
          <li className="flex items-start gap-3">
            <GridIcon size={20} className="shrink-0 text-brand-light" />
            <span>
              <strong className="text-white">{domainsFigure.value}</strong> {domainsFigure.label}
            </span>
          </li>
        ) : null}
      </ul>
    </aside>
  );
}
