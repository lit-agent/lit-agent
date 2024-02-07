import { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const NavTabLink = ({
  children,
  ...props
}: ComponentProps<typeof Link>) => (
  <Link
    className={
      "data-[state=active]:bg-transparent transition-all w-full flex justify-center"
    }
    {...props}
  >
    <div
      className={cn(
        "w-8 h-8 p-2 rounded-full",
        // tab === value && "bg-primary ",
      )}
    >
      {children}
    </div>
  </Link>
)
