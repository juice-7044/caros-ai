import test from 'node:test'
import assert from 'node:assert/strict'
import { hiringCost, stackCost } from '../lib/home-calculators.ts'

test('hiring cost is employees x salary: defaults 5 and 10 at $50,000', () => {
  assert.equal(hiringCost({ employees: 5, salary: 50000 }).annual, 250000)
  assert.equal(hiringCost({ employees: 10, salary: 50000 }).annual, 500000)
})

test('hiring cost clamps zero, empty, negative, non-finite and extreme inputs', () => {
  assert.equal(hiringCost({ employees: 0, salary: 50000 }).annual, 0)
  assert.equal(hiringCost({ employees: NaN, salary: 50000 }).annual, 0)
  assert.equal(hiringCost({ employees: '' , salary: 50000 }).annual, 0)
  assert.equal(hiringCost({ employees: -3, salary: 50000 }).annual, 0)
  assert.equal(hiringCost({ employees: 5, salary: Infinity }).annual, 0)
  assert.equal(hiringCost({ employees: 5, salary: -1 }).annual, 0)
  // extreme values are capped (1,000 employees, $1,000,000 salary) and never overflow to Infinity
  assert.equal(hiringCost({ employees: 1e12, salary: 1e15 }).annual, 1000 * 1000000)
  // fractional headcount is rounded down to whole people
  assert.equal(hiringCost({ employees: 2.9, salary: 100 }).annual, 200)
})

test('stack: annual software spend = subscriptions x average monthly cost x 12', () => {
  const r = stackCost({ subscriptions: 10, avgMonthly: 80, employees: 0, weeklySwitchHoursPerEmployee: 0, hourlyCost: 0 })
  assert.equal(r.annualSoftware, 9600)
})

test('stack: time cost multiplies employees once, 52 weeks and hourly cost; platform count is not a multiplier', () => {
  const base = { subscriptions: 0, avgMonthly: 0, employees: 5, weeklySwitchHoursPerEmployee: 2, hourlyCost: 30 }
  assert.equal(stackCost(base).annualTime, 5 * 2 * 52 * 30)
  assert.equal(stackCost({ ...base, platforms: 12 }).annualTime, 15600)
  assert.equal(stackCost({ ...base, platforms: 1 }).annualTime, 15600)
})

test('stack: combined total, breakdown shares, and defensive inputs', () => {
  const r = stackCost({ subscriptions: 10, avgMonthly: 80, employees: 5, weeklySwitchHoursPerEmployee: 2, hourlyCost: 30 })
  assert.equal(r.combined, 9600 + 15600)
  assert.deepEqual([r.softwareShare, r.timeShare], [9600 / 25200, 15600 / 25200])
  const zero = stackCost({ subscriptions: 0, avgMonthly: 0, employees: 0, weeklySwitchHoursPerEmployee: 0, hourlyCost: 0 })
  assert.deepEqual([zero.combined, zero.softwareShare, zero.timeShare], [0, 0, 0])
  const bad = stackCost({ subscriptions: -4, avgMonthly: NaN, employees: '', weeklySwitchHoursPerEmployee: Infinity, hourlyCost: -9 })
  assert.equal(bad.combined, 0)
  const huge = stackCost({ subscriptions: 1e9, avgMonthly: 1e12, employees: 1e9, weeklySwitchHoursPerEmployee: 1e9, hourlyCost: 1e9 })
  assert.ok(Number.isFinite(huge.combined))
  // weekly hours per person cannot exceed a 168-hour week
  assert.ok(stackCost({ subscriptions: 0, avgMonthly: 0, employees: 1, weeklySwitchHoursPerEmployee: 500, hourlyCost: 1 }).annualTime <= 168 * 52)
})
