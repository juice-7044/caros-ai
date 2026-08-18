import { cn } from "@/lib/utils"

/** Simple radiating sunburst mark echoing the CAROS logo. Decorative. */
export function Sunburst({ className }: { className?: string }) {
  const rays = 9
  return (
    <svg
      viewBox="0 0 100 46"
      className={cn("h-auto w-full", className)}
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: rays }).map((_, i) => {
        const spread = 116 // degrees fanned across the top
        const start = 90 + spread / 2
        const step = spread / (rays - 1)
        const angle = ((start - i * step) * Math.PI) / 180
        const cx = 50
        const cy = 46
        const inner = 20
        const outer = 44
        return (
          <line
            key={i}
            x1={cx + Math.cos(angle) * inner}
            y1={cy - Math.sin(angle) * inner}
            x2={cx + Math.cos(angle) * outer}
            y2={cy - Math.sin(angle) * outer}
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}
