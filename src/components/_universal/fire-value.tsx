"use client"

import { FireIcon } from "@/lib/assets"

import { PRIMARY_COLOR } from "@/config"
import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export const FireValue = ({
  value,
  className,
  ...props
}: { value?: number } & HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("text-primary inline-flex items-center", className)}
    color={PRIMARY_COLOR}
    {...props}
  >
    <span className={"h-4 w-4"}>
      <FireIcon />
    </span>

    {value ?? "??"}
  </span>
)
