import type { Metadata } from "next"
import { DealershipPage } from "@/components/caros/dealership-page"

const SITE_URL = "https://getcaros.com"

export const metadata: Metadata = {
  title: "CAROS for Car Dealerships | More Leads. More Test Drives. More Cars Sold.",
  description: "CAROS helps independent, used-car, franchise, and multi-location dealerships capture buyer interest, book test drives, follow up faster, and grow revenue.",
  keywords: ["car dealership lead follow up", "dealership test drive scheduling", "automotive revenue operations", "car dealer CRM automation"],
  alternates: { canonical: `${SITE_URL}/industries/car-dealerships` },
  openGraph: { title: "CAROS for Car Dealerships", description: "Turn more buyer interest into conversations, test drives, sales opportunities, and long-term customer relationships.", url: `${SITE_URL}/industries/car-dealerships`, type: "website" },
}

export default function CarDealershipsPage() {
  return <DealershipPage />
}
