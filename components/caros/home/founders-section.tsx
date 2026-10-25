import spanishCatalog from "@/messages/full/home-general.es.json"
import { useSpanish } from "@/lib/use-spanish"
import { Reveal } from "@/components/caros/reveal"
import { Founders } from "@/components/caros/founders"

export function FoundersSection() {
  const { tr } = useSpanish(spanishCatalog)
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal className="max-w-4xl">
          <h2 className="text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1] tracking-tight">
            {tr("Small businesses shouldn't need an enterprise-sized team to build an")}{" "}
            <span className="font-serif font-normal italic">{tr("enterprise-quality revenue operation.")}</span>
          </h2>
        </Reveal>

        <div className="mt-14">
          <Founders variant="light" />
        </div>

        <Reveal delay={100}>
          <p className="mt-12 max-w-3xl border-l-2 border-gold pl-6 text-lg text-muted-foreground">
            {tr("Businesses deserve to know where their customers come from, where opportunities are being lost, and where every dollar comes from.")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
