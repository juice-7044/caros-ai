// A visual-only preview must not create contacts, send calls/messages or trigger payments.
// Never active on production, even if the branch name is reused there.
export function pricingReviewMode(env: Record<string, string | undefined>): boolean {
  return env.VERCEL_ENV === 'preview' && env.VERCEL_GIT_COMMIT_REF === 'feat/pricing-3d-preview'
}
