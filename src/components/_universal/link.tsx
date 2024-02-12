import { ComponentProps } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const ButtonLink = ({
  className,
  ...props
}: ComponentProps<typeof Link>) => {
  return (
    <Link className={cn(buttonVariants(), "w-full", className)} {...props} />
  )
}
