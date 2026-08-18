import Image from "next/image"
import { Reveal } from "./reveal"

export const FOUNDERS = [
  {
    name: "Carly Fowler, MBA",
    role: "Founder",
    photo: "/founder-carly.png",
    objectPosition: "30% 40%",
    bio: "Carly spent her career at the intersection of go-to-market strategy and revenue operations — scaling how companies acquire customers and turn spend into measurable revenue. She founded CAROS after watching hard-working local owners pour money into marketing with no way to see what came back, and leads it with one rule: sophisticated technology, delivered as an extremely simple experience.",
  },
  {
    name: "Ann Lemond-Hume",
    role: "Co-Founder",
    photo: "/founder-ann.png",
    bio: "Ann brings deep expertise in technology deployment, AI-driven automation, and operations at scale. She architects the intelligent workflows behind CAROS that make sure no lead, estimate, or invoice ever quietly disappears — turning complex automation into something that simply works in the background, so every dollar is accounted for.",
  },
]

export function Founders({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark"
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {FOUNDERS.map((f, i) => (
        <Reveal
          key={f.name}
          delay={i * 90}
          className={`flex flex-col rounded-2xl border p-6 lg:p-8 ${
            dark ? "border-ink-border bg-ink" : "border-border bg-card"
          }`}
        >
          <div className="flex items-center gap-5">
            <Image
              src={f.photo || "/placeholder.svg"}
              alt={f.name}
              width={96}
              height={96}
              className="h-20 w-20 rounded-full object-cover"
              style={{ objectPosition: f.objectPosition ?? "center" }}
            />
            <div>
              <h3 className={`text-xl font-extrabold tracking-tight ${dark ? "text-ink-foreground" : "text-foreground"}`}>
                {f.name}
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-gold">{f.role}</p>
            </div>
          </div>
          <p className={`mt-6 leading-relaxed ${dark ? "text-ink-muted" : "text-muted-foreground"}`}>{f.bio}</p>
        </Reveal>
      ))}
    </div>
  )
}
