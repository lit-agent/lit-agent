import { ComponentProps } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export const ButtonLink = ({
  disabled,
  className,
  ...props
}: ComponentProps<typeof Link> &
  ComponentProps<typeof Button> & {
    disabled?: boolean
  }) => {
  return disabled ? (
    <Button className={cn("w-full", className)} disabled {...props} />
  ) : (
    <Link className={cn(buttonVariants(), "w-full", className)} {...props} />
  )
}
