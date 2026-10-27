import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplicationForm, ApplicationFormFromUrl } from "@/components/sections/application-form";
import { NumberedColumns, NumberedList } from "@/components/sections/editorial";
import { NextPage } from "@/components/sections/next-page";
import { PageHero, QuickAccess } from "@/components/sections/page-hero";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeader } from "@/components/ui/heading";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { applicationForm, careersAnchors, careersHero, jobOffers, offersSection, trades, whyJoin } from "@/lib/content/careers";
import { contactHero } from "@/lib/content/contact";
import { primaryNav } from "@/lib/content/navigation";
import { routes } from "@/lib/content/routes";
import { ui } from "@/lib/content/ui";

export const metadata: Metadata = {
  title: "Carrières",
  description:
    "Rejoignez Maintenance Assistance Plus : électricité, CVC, fluides, plomberie et maintenance multi-technique. Offres d'emploi et candidature spontanée.",
};

const contactLabel = primaryNav.find((item) => item.href === routes.contact)?.label ?? "";
const applyHref = `#${careersAnchors.apply}`;

export default function CarrieresPage() {
  return (
    <>
      <PageHero crumbs={[{ label: careersHero.eyebrow }]} title={careersHero.title} lead={careersHero.lead} image={careersHero.image} imagePosition="50% 35%">
        <QuickAccess
          label={ui.quickAccess}
          items={[
            { href: `#${careersAnchors.why}`, label: whyJoin.eyebrow },
            { href: `#${careersAnchors.trades}`, label: trades.eyebrow },
            { href: `#${careersAnchors.offers}`, label: offersSection.eyebrow },
            { href: applyHref, label: applicationForm.asideEyebrow },
          ]}
        />
      </PageHero>

      {/* WHY JOIN */}
      <section id={careersAnchors.why} className="scroll-mt-24 bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <Reveal>
                <Eyebrow>{whyJoin.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 max-w-2xl text-h1 font-semibold text-balance">
                {whyJoin.title}
              </Reveal>
            </div>
            <Reveal className="col-span-4 flex flex-col gap-5 text-lg text-text/80 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:pt-10">
              {whyJoin.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <div className="mt-16 lg:mt-24">
            <ParallaxImage
              src={whyJoin.image}
              alt={whyJoin.imageAlt}
              sizes="(min-width: 1680px) 1680px, 100vw"
              className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
              imageClassName="object-[50%_35%]"
            />
          </div>
          <NumberedColumns items={whyJoin.pillars} className="mt-12 md:grid-cols-3 lg:mt-16" />
        </Container>
      </section>

      {/* TRADES — dark */}
      <section id={careersAnchors.trades} className="theme-dark scroll-mt-24 bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow>{trades.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 max-w-md text-h2 font-semibold text-balance">
                {trades.title}
              </Reveal>
              <Reveal as="p" className="mt-6 max-w-sm text-lg text-muted">
                {trades.lead}
              </Reveal>
            </div>
            <NumberedList items={trades.items} className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:self-end" />
          </div>
        </Container>
      </section>

      {/* OPEN POSITIONS */}
      <section id={careersAnchors.offers} className="scroll-mt-24 bg-surface py-section-y text-text">
        <Container>
          <SectionHeader eyebrow={offersSection.eyebrow} title={offersSection.title} />
          {jobOffers.length > 0 ? (
            <ul className="border-b border-border">
              {jobOffers.map((offer) => (
                <Reveal as="li" key={offer.slug} className="border-t border-border">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 py-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-5">
                      <p className="eyebrow text-muted">
                        <span className="text-accent">{offer.domain}</span>
                        <span aria-hidden className="mx-2 opacity-50">
                          /
                        </span>
                        {offer.location} · {offer.contract}
                      </p>
                      <h3 className="mt-2 text-h3 font-semibold">{offer.title}</h3>
                    </div>
                    <p className="text-muted lg:col-span-5">{offer.summary}</p>
                    <div className="lg:col-span-2 lg:justify-self-end">
                      <TextLink href={`${routes.careers}?poste=${offer.slug}${applyHref}`}>{offersSection.apply}</TextLink>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal className="grid grid-cols-1 gap-8 border-t border-border pt-8 lg:grid-cols-12 lg:items-end lg:pt-10">
              <div className="lg:col-span-8">
                <h3 className="text-h3 font-semibold">{offersSection.emptyTitle}</h3>
                <p className="mt-3 max-w-xl text-lg text-muted">{offersSection.emptyBody}</p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <ButtonLink href={applyHref} size="md">
                  {offersSection.emptyCta}
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* APPLICATION */}
      <section id={careersAnchors.apply} className="scroll-mt-24 bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <aside className="col-span-4 mb-14 md:col-span-8 lg:col-span-4 lg:mb-0">
              <div className="lg:sticky lg:top-32">
                <h2 className="eyebrow text-muted">{applicationForm.asideEyebrow}</h2>
                <p className="mt-5 max-w-sm text-h3 font-semibold tracking-tight">{applicationForm.asideTitle}</p>

                <h3 className="eyebrow mt-12 text-muted">{applicationForm.howEyebrow}</h3>
                <ol className="mt-5 border-t border-border">
                  {applicationForm.how.map((step, i) => (
                    <li key={step.title} className="flex gap-5 border-b border-border py-5">
                      <span aria-hidden className="tabular pt-0.5 text-sm font-semibold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-muted">
                        <span className="block font-semibold text-text">{step.title}</span>
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
              <Suspense fallback={<ApplicationForm />}>
                <ApplicationFormFromUrl />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      <NextPage href={routes.contact} label={contactLabel} image={contactHero.image} />
    </>
  );
}
