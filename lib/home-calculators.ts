export const LIMITS = { employees: 1000, salary: 1_000_000 } as const

/** Coerce any form value to a finite number in [0, max]; whole numbers when `whole` is set. */
export function sanitize(value: unknown, max: number, whole = false): number {
  const n = typeof value === 'number' ? value : typeof value === 'string' && value.trim() !== '' ? Number(value) : NaN
  if (!Number.isFinite(n) || n <= 0) return 0
  const capped = Math.min(n, max)
  return whole ? Math.floor(capped) : capped
}

export type HiringInput = { employees: unknown; salary: unknown }

export function hiringCost({ employees, salary }: HiringInput) {
  return { annual: sanitize(employees, LIMITS.employees, true) * sanitize(salary, LIMITS.salary) }
}

export type StackInput = {
  subscriptions: unknown
  avgMonthly: unknown
  employees: unknown
  weeklySwitchHoursPerEmployee: unknown
  hourlyCost: unknown
  /** Number of separate logins; shown for context and never used as a multiplier. */
  platforms?: unknown
}

export function stackCost(input: StackInput) {
  const subscriptions = sanitize(input.subscriptions, 500, true)
  const avgMonthly = sanitize(input.avgMonthly, 100_000)
  const employees = sanitize(input.employees, LIMITS.employees, true)
  const weeklyHours = sanitize(input.weeklySwitchHoursPerEmployee, 168)
  const hourlyCost = sanitize(input.hourlyCost, 1000)
  // Hours are per employee, so headcount is applied exactly once. Platform/login count is context only.
  const annualSoftware = subscriptions * avgMonthly * 12
  const annualTime = employees * weeklyHours * 52 * hourlyCost
  const combined = annualSoftware + annualTime
  return {
    annualSoftware,
    annualTime,
    combined,
    softwareShare: combined > 0 ? annualSoftware / combined : 0,
    timeShare: combined > 0 ? annualTime / combined : 0,
  }
}
