import { getTranslations } from "next-intl/server"
import { Hero } from "@/components/caros/home/hero"
import { UnifiedSystem } from "@/components/caros/home/unified-system"
import { DisconnectedCost } from "@/components/caros/home/disconnected-cost"
import { StackCalculator } from "@/components/caros/home/stack-calculator"
import { ChallengePairs } from "@/components/caros/home/challenge-pairs"
import { LifecycleFlow } from "@/components/caros/home/lifecycle-flow"
import { ProductExperience } from "@/components/caros/home/product-experience"
import { Roi } from "@/components/caros/home/roi"
import { HomeAnalytics } from "@/components/caros/home/home-analytics"
import { CtaBand } from "@/components/caros/cta-band"
import { TrustpilotWidgetLoader } from "@/components/TrustpilotWidgetLoader"
import { DEMO_URL } from "@/lib/home-nav"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Home.final" })
  return (
    <>
      <HomeAnalytics />
      {/* 1 Cost of scaling + unified RevOS */}
      <Hero />
      {/* 2 One dashboard, nine capabilities */}
      <UnifiedSystem showcase={null} />
      {/* 3 Cost of disconnected software */}
      <DisconnectedCost />
      {/* 4 Tech stack cost calculator */}
      <StackCalculator />
      {/* 5 Challenge / capability pairs */}
      <ChallengePairs />
      {/* 6 Connected customer lifecycle */}
      <LifecycleFlow />
      {/* 7 Product experience */}
      <ProductExperience />
      {/* 8 Revenue opportunity calculator + audit */}
      <Roi />
      {/* 9 Final CTA */}
      <CtaBand headline={t("title")} sub={t("sub")} ctaLabel={t("primary")} ctaHref={DEMO_URL} trackDemo="final_cta">
        <p className="mt-10 font-serif text-xl italic text-gold">{t("tagline")}</p>
        <p className="mt-3 max-w-xl text-xs leading-relaxed text-ink-muted">{t("privacy")}</p>
      </CtaBand>
      <section className="border-t border-border/60 bg-background px-6 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* TrustBox widget - Review Collector */}
          <TrustpilotWidgetLoader />
          {/* End TrustBox widget */}
        </div>
      </section>
    </>
  )
}
