export type StoryMode = 'five' | 'ten'

/** Headcount each toggle button writes into the shared calculator state. */
export const MODE_COUNT: Record<StoryMode, number> = { five: 5, ten: 10 }

const MAX_EMPLOYEES = 1000 // same cap as LIMITS.employees in home-calculators.ts (parity asserted in tests)

/** Same coercion hiringCost applies to the headcount field: finite, whole, 0..MAX. Kept local so this module loads standalone. */
function headcount(value: unknown): number {
  const n = typeof value === 'number' ? value : typeof value === 'string' && value.trim() !== '' ? Number(value) : NaN
  if (!Number.isFinite(n) || n <= 0) return 0
  return Math.floor(Math.min(n, MAX_EMPLOYEES))
}

/**
 * The story view is derived from the single headcount the visitor sees in the calculator.
 * Ten functions only for 10+ employees; everything else shows the five illustrative roles.
 * `exact` is false for custom counts so the UI can say the examples are not a one-to-one mapping.
 */
export function storyView(employees: unknown): { mode: StoryMode; count: number; exact: boolean } {
  const count = headcount(employees)
  const mode: StoryMode = count >= MODE_COUNT.ten ? 'ten' : 'five'
  return { mode, count, exact: count === MODE_COUNT[mode] }
}
