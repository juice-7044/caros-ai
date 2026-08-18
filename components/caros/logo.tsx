import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * CAROS brand logo. Renders the gold wordmark on a transparent background so it
 * sits directly on both light and dark surfaces. Size is controlled by a height
 * utility passed via `className` (e.g. "h-8").
 */
export function Logo({
  className,
  href = "/",
}: {
  className?: string
  href?: string | null
}) {
  const mark = (
    <Image
      src="/caros-logo.png"
      alt="CAROS"
      width={300}
      height={200}
      priority
      className={cn("w-auto select-none", className ?? "h-8")}
    />
  )

  if (href === null) return mark

  return (
    <Link href={href} aria-label="CAROS home" className="inline-flex">
      {mark}
    </Link>
  )
}
