import type { Metadata } from "next"
import { WhyCarosPage } from "@/components/caros/why-caros-page"

export const metadata: Metadata = {
  title: "Why CAROS",
  description: "The connected revenue operating system behind your growth.",
}

export default function Page() {
  return <WhyCarosPage />
}
