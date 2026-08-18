"use client"

import { Fragment, useState } from "react"
import { Check, X, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { CAPABILITY_ROWS, COMPARISON_COLUMNS, type CompareColumn } from "@/lib/comparison"

const CAROS_COL: CompareColumn = "CAROS"

function Mark({ on, caros }: { on: boolean; caros: boolean }) {
  if (on) {
    return (
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full",
          caros ? "bg-gold/15 text-gold" : "bg-foreground/5 text-foreground",
        )}
      >
        <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">Offered as a core capability</span>
      </span>
    )
  }
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground/45">
      <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      <span className="sr-only">Not a core capability</span>
    </span>
  )
}

export function ComparisonTable() {
  const [openRow, setOpenRow] = useState<number | null>(null)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="sticky left-0 z-20 min-w-[240px] bg-card px-5 py-5 align-bottom text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                Capability
              </th>
              {COMPARISON_COLUMNS.map((col) => {
                const isCaros = col === CAROS_COL
                return (
                  <th
                    key={col}
                    scope="col"
                    className={cn(
                      "px-4 py-5 text-center align-bottom text-sm font-bold",
                      isCaros ? "bg-gold/10 text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span className={cn("inline-flex flex-col items-center gap-1", isCaros && "text-gold")}>
                      {col}
                      {isCaros ? (
                        <span className="eyebrow text-[0.6rem] text-gold/70">Revenue OS</span>
                      ) : null}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {CAPABILITY_ROWS.map((row, i) => {
              const hasInfo = Boolean(row.explanation)
              const isOpen = openRow === i
              return (
                <Fragment key={row.capability}>
                  <tr className="border-b border-border/70 transition-colors hover:bg-muted/40">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 min-w-[240px] max-w-[280px] bg-card px-5 py-4 text-sm font-medium text-foreground"
                    >
                      {hasInfo ? (
                        <button
                          type="button"
                          onClick={() => setOpenRow(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="group flex items-start gap-2 text-left transition-colors hover:text-gold"
                          title={row.explanation}
                        >
                          <span className="text-balance">{row.capability}</span>
                          <Info
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0 transition-colors",
                              isOpen ? "text-gold" : "text-muted-foreground/60 group-hover:text-gold",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <span className="text-balance">{row.capability}</span>
                      )}
                    </th>
                    {COMPARISON_COLUMNS.map((col) => {
                      const isCaros = col === CAROS_COL
                      return (
                        <td
                          key={col}
                          className={cn("px-4 py-4 text-center", isCaros && "bg-gold/[0.06]")}
                        >
                          <span className="inline-flex justify-center">
                            <Mark on={row.values[col]} caros={isCaros} />
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                  {hasInfo && isOpen ? (
                    <tr className="border-b border-border/70 bg-muted/50">
                      <td colSpan={COMPARISON_COLUMNS.length + 1} className="px-5 py-4">
                        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                          <span className="font-semibold text-foreground">{row.capability}: </span>
                          {row.explanation}
                        </p>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
