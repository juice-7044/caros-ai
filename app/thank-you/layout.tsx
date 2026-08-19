import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "You're In — Your CAROS Revenue System Starts Here",
  description: "Your CAROS purchase is confirmed. Here's what happens next.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: true },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children
}
