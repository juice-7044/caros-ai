import { Hero } from "@/components/caros/home/hero"
import { RevenueFirst } from "@/components/caros/home/revenue-first"
import { Leaks } from "@/components/caros/home/leaks"
import { Pivot } from "@/components/caros/home/pivot"
import { MoreLeads } from "@/components/caros/home/more-leads"
import { EnterCaros } from "@/components/caros/home/enter-caros"
import { Integrations } from "@/components/caros/home/integrations"
import { MoneyJourney } from "@/components/caros/home/money-journey"
import { HumanAnswering } from "@/components/caros/home/human-answering"
import { Retention } from "@/components/caros/home/retention"
import { Lifecycle } from "@/components/caros/home/lifecycle"
import { View360 } from "@/components/caros/home/view-360"
import { Process } from "@/components/caros/home/process"
import { PricingPreview } from "@/components/caros/home/pricing-preview"
import { Roi } from "@/components/caros/home/roi"
import { Industries } from "@/components/caros/home/industries"
import { FoundersSection } from "@/components/caros/home/founders-section"
import { CtaBand } from "@/components/caros/cta-band"

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Revenue-first positioning + lifecycle visual */}
      <RevenueFirst />
      {/* Section 2 — Pain points */}
      <Leaks />
      <Pivot />
      {/* More leads aren't always the answer */}
      <MoreLeads />
      {/* Section 3 — Five pillars */}
      <EnterCaros />
      {/* Section 4 — Money journey (terminal) */}
      <MoneyJourney />
      {/* Section 5 — Human answering */}
      <HumanAnswering />
      <Retention />
      {/* Full revenue lifecycle — marketing spend + database as an asset */}
      <Lifecycle />
      {/* Works with compatible tools in your existing ecosystem */}
      <Integrations />
      {/* Section 6 — Business intelligence dashboard */}
      <View360 />
      {/* Section 7 — How it works */}
      <Process />
      {/* Section 8 — Pricing */}
      <PricingPreview />
      {/* Section 9 — ROI calculator */}
      <Roi />
      {/* Section 10 — Industries (scrolling) */}
      <Industries />
      <FoundersSection />
      {/* Section 11 — Final CTA */}
      <CtaBand />
      <section className="border-t border-border/60 bg-background px-6 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* TrustBox widget - Review Collector */}
          <div
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6a85bb452d3cdad756440fa7"
            data-style-height="52px"
            data-style-width="100%"
            data-token="54408afc-3dd2-45ae-b5b8-3ab8115cde87"
          >
            <a
              href="https://www.trustpilot.com/review/getcaros.com"
              target="_blank"
              rel="noopener"
            >
              Trustpilot
            </a>
          </div>
          {/* End TrustBox widget */}
        </div>
      </section>
    </>

  )
}
