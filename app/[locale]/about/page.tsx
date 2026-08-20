import type { Metadata } from "next"
import {useTranslations} from "next-intl"
import Image from "next/image"
import { PageHero, Eyebrow } from "@/components/caros/ui-bits"
import { Founders } from "@/components/caros/founders"
import { Reveal } from "@/components/caros/reveal"
import { CtaBand } from "@/components/caros/cta-band"

export const metadata: Metadata = {
  title: "About",
  description:
    "CAROS was built to give local business owners the revenue clarity big companies take for granted — sophisticated technology with an extremely simple experience.",
}

const beliefs = [
  {
    title: "Owners deserve clarity.",
    body: "You should never have to guess which marketing works or where a lead went. The answer should already be waiting for you.",
  },
  {
    title: "Technology should be invisible.",
    body: "The best system is the one your customers never notice and your team never has to fight. Sophisticated underneath, simple on top.",
  },
  {
    title: "Every lead is money.",
    body: "A missed call isn't a missed call. It's a missed job, a missed referral, and a missed repeat customer. We treat it that way.",
  },
]

export default function AboutPage() {
  const t = useTranslations("pages.about")

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        serifTitle={t("serifTitle")}
        subtitle={t("subtitle")}
      />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <Eyebrow>{t("story")}</Eyebrow>
              <h2 className="mt-6 text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
                {t("storyTitle")}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  &ldquo;Where are my customers actually coming from?&rdquo; Every owner we met was pouring money into
                  marketing, answering services, and software — and none of it could tell them what was working.
                </p>
                <p>
                  So we built CAROS: one connected system that captures every lead, follows up on every opportunity,
                  earns every review, and ties every dollar of spend back to booked revenue.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80} className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-ink p-10">
                <div className="pointer-events-none absolute inset-0 radial-glow opacity-70" />
                <div className="relative flex flex-col items-center justify-center py-8 text-center">
                  <Image src="/caros-logo.png" alt="CAROS" width={360} height={240} className="w-full max-w-xs" />
                  <p className="mt-8 font-serif text-2xl italic text-ink-foreground">
                    Sophisticated technology. An extremely simple experience.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>{t("beliefs")}</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
              Three beliefs that shaped everything.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 80} className="border-t-2 border-gold pt-6">
                <h3 className="font-serif text-2xl italic text-foreground">{b.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Reveal>
            <Eyebrow>{t("leadership")}</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
              The people behind the system.
            </h2>
          </Reveal>
          <div className="mt-16">
            <Founders variant="light" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
