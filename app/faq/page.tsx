import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { PageHero, AuditButton, Eyebrow } from "@/components/caros/ui-bits"
import { Reveal } from "@/components/caros/reveal"
import { AUDIT_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Already Have Software? FAQ",
  description:
    "CAROS is the Revenue Operating System — designed to work alongside the tools you already run: ServiceTitan, Jobber, Housecall Pro, your CRM, lead sources, Google Business Profile, and more. See how CAROS connects and enhances your existing stack.",
}

const faqs: { q: string; a: React.ReactNode; highlight?: string }[] = [
  {
    q: "What if I already use ServiceTitan?",
    a: "ServiceTitan captures an incredible amount of operational information — calls, customers, jobs, technicians, estimates, memberships, revenue, and marketing. That data is genuinely valuable. The challenge is that someone still has to decide what deserves attention, what it means for revenue, and what should happen next. CAROS helps translate that broader revenue picture into owner-friendly intelligence — surfacing missed and aging opportunities, follow-up priorities, reactivation, lead-capture issues, reputation signals, and workflow gaps — then helps automate or route the next action rather than handing you one more dashboard to interpret. ServiceTitan can remain an important part of your operation. CAROS helps make sure the broader revenue story does not get lost inside the data.",
  },
  {
    q: "What if I use Jobber, Housecall Pro, FieldEdge, or another field-service platform?",
    a: "You do not need to abandon the platform that runs your scheduling, dispatch, quoting, invoicing, or field work. Those systems can keep doing what they do well. CAROS focuses on the revenue layer around and across your operation — lead capture, response, follow-up, reactivation, revenue visibility, public presence, customer communications, missed opportunities, and management insight — then executes the workflows that turn activity into booked work. Keep the system that runs your jobs. CAROS helps you run the revenue around them.",
    highlight: "Keep the system that runs your jobs. CAROS helps you run the revenue around them.",
  },
  {
    q: "What if I get leads from Angi, Thumbtack, Google LSA, Facebook, or other sources?",
    a: "We are not asking you to stop using sources that produce opportunities. Generating a lead is only the beginning. CAROS focuses on what happens after the lead arrives: How quickly was it contacted? Was it qualified? Did it book? Did an estimate go out — and get followed up? Did the lead quietly disappear? What revenue actually resulted, and was the source worth the spend? A lead is not revenue until something happens with it. CAROS helps make sure something does.",
    highlight: "A lead is not revenue until something happens with it.",
  },
  {
    q: "What if I already have an answering service?",
    a: "That does not automatically make CAROS unnecessary. A traditional answering service picks up the phone or takes a message. CAROS is concerned with the broader revenue workflow surrounding that conversation — a branded customer experience, lead qualification, scheduling, SMS follow-up, workflow triggers, escalation, customer context, and revenue tracking. Depending on your business, CAROS can complement, restructure, or replace pieces of an existing answering process. The point is not simply that the phone gets answered; it is that each conversation moves toward booked, tracked revenue. CAROS is never simply an answering service.",
  },
  {
    q: "What if I already use an AI receptionist?",
    a: "Answering the call is only one part of the revenue lifecycle. CAROS looks beyond that first conversation — into lead follow-up, estimates, reactivation, revenue visibility, customer experience, public presence, recurring opportunities, and what should happen next. Where it makes sense, CAROS uses automation and AI, while deliberately keeping humans involved when judgment, relationships, or exceptions matter. An AI receptionist can be one piece of the picture; CAROS is concerned with the entire path from first contact to booked, repeat revenue — and everything that has to happen in between.",
  },
  {
    q: "What if my business already has a CRM?",
    a: "Great — and no, CAROS does not require you to throw away a CRM that already works. Storing contacts and tracking a pipeline is useful, but the issue CAROS addresses is broader: does the information inside your systems consistently turn into revenue action? CAROS focuses on what your business should do with what it already knows — who to follow up with, which opportunities are aging, what to prioritize, and which next step should happen automatically. Your CRM can stay. CAROS helps make sure the data actually turns into revenue.",
  },
  {
    q: "What if I already manage my Google Business Profile and reviews?",
    a: "CAROS looks at your Google Business Profile, reviews, and public presence through a revenue lens. The question is not simply whether a profile exists — it is what the signals say: review strength and recency, response behavior, profile completeness, the public customer experience, conversion friction, and any discrepancies between how you look online and how the business actually runs. Those signals get incorporated into a broader view of revenue opportunity rather than treated as an isolated marketing task. Managing your profile is good; connecting it to revenue is better.",
  },
  {
    q: "What if all of my systems already work?",
    a: "Then CAROS may not need to replace anything. The first goal is to understand what is already working well. CAROS becomes valuable when there are gaps between systems, inconsistent follow-up, missed opportunities, manual work, limited revenue visibility, or simply too much information for management to interpret efficiently. If your business has genuinely solved those things, we will not manufacture a problem to justify ourselves. CAROS is Revenue Obsessed. That means solving revenue problems, not inventing them.",
    highlight: "CAROS is Revenue Obsessed. That means solving revenue problems, not inventing them.",
  },
  {
    q: "Do I need to replace everything to implement CAROS?",
    a: "No. CAROS is designed around your business rather than forcing every company into one identical technology stack. Some businesses keep most of their existing tools and simply connect them. Others discover they are paying for redundant systems or manual work that CAROS can consolidate. The right implementation depends on your actual operation, your channels, and where revenue is being lost. Start with what you have, and change only what clearly helps you see, protect, and create more revenue.",
  },
  {
    q: "So what does CAROS add if I already have good technology?",
    a: "Having data is different from knowing what deserves attention. Having automation is different from knowing what should be automated. Having a CRM is different from having consistent follow-up. Having leads is different from converting them. Having dashboards is different from having a clear revenue story. That gap — between what is happening in your business, what it means for revenue, and what should happen next — is exactly where CAROS lives. CAROS helps connect the dots so the next revenue-producing action is clear, prioritized, and handled.",
    highlight:
      "CAROS helps connect the dots between what is happening in your business, what it means for revenue, and what should happen next.",
  },
]

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Works With Your Existing Ecosystem"
        title="Already have software?"
        serifTitle="Good."
        subtitle="CAROS is designed to work with the technology and channels already running your business. The goal is not to make you start over. It is to help you see, protect, and create more revenue across the entire operation."
      />

      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-[900px] px-6 py-24 lg:px-12 lg:py-32">
          <Reveal>
            <Eyebrow>The Revenue Operating System</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
              You don&apos;t need fewer tools. You need them{" "}
              <span className="font-serif font-normal italic text-gold-gradient">working together.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              CAROS is the layer that helps answer the questions your stack rarely does on its own: What needs
              attention? Where is revenue being lost? Which opportunities should be prioritized? What changed? What
              should happen next — and can it happen automatically?
            </p>
          </Reveal>

          <div className="mt-14 divide-y divide-border border-y border-border">
            {faqs.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  <span className="text-balance">{item.q}</span>
                  <Plus className="mt-1 h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <div className="mt-4 max-w-2xl space-y-4">
                  <p className="leading-relaxed text-muted-foreground">{item.a}</p>
                  {item.highlight ? (
                    <p className="border-l-2 border-gold pl-4 font-serif text-lg italic leading-snug text-gold-gradient">
                      {item.highlight}
                    </p>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-border bg-secondary">
        <div className="mx-auto w-full max-w-[900px] px-6 py-24 text-center lg:py-32">
          <Reveal className="flex flex-col items-center">
            <h2 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-5xl">
              Already invested in technology? Let&apos;s see whether it is{" "}
              <span className="font-serif font-normal italic text-gold-gradient">
                producing everything it should.
              </span>
            </h2>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <AuditButton label="Get My Free Revenue Audit" href={AUDIT_URL} external />
              <AuditButton label="See How CAROS Works" href="/how-it-works" variant="outline-light" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
