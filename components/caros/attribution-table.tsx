import { cn } from "@/lib/utils"

type Row = {
  source: string
  spend: string
  leads: number
  jobs: number
  revenue: string
  roas: string
  best?: boolean
}

const rows: Row[] = [
  { source: "Google Ads", spend: "$3,000", leads: 38, jobs: 11, revenue: "$22,400", roas: "7.5x" },
  { source: "Facebook", spend: "$1,000", leads: 21, jobs: 3, revenue: "$3,600", roas: "3.6x" },
  { source: "Angi", spend: "$750", leads: 17, jobs: 2, revenue: "$1,900", roas: "2.5x" },
  { source: "Local Sponsorship", spend: "$750", leads: 10, jobs: 4, revenue: "$8,700", roas: "11.6x", best: true },
]

export function AttributionTable({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-border">
              {["Source", "Spend", "Leads", "Booked Jobs", "Revenue", "ROAS"].map((h, i) => (
                <th
                  key={h}
                  className={cn(
                    "px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground",
                    i > 0 && "text-right",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.source}
                className={cn(
                  "border-b border-border/70 last:border-0 transition-colors",
                  row.best ? "bg-gold/[0.06]" : "hover:bg-muted/50",
                )}
              >
                <td className="px-5 py-5">
                  <span className="flex items-center gap-2 font-semibold">
                    {row.source}
                    {row.best ? (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold">
                        Best return
                      </span>
                    ) : null}
                  </span>
                </td>
                <td className="px-5 py-5 text-right tabular-nums text-muted-foreground">{row.spend}</td>
                <td className="px-5 py-5 text-right tabular-nums text-muted-foreground">{row.leads}</td>
                <td className="px-5 py-5 text-right tabular-nums text-muted-foreground">{row.jobs}</td>
                <td className="px-5 py-5 text-right font-semibold tabular-nums">{row.revenue}</td>
                <td
                  className={cn(
                    "px-5 py-5 text-right font-bold tabular-nums",
                    row.best ? "text-gold" : "text-foreground",
                  )}
                >
                  {row.roas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
