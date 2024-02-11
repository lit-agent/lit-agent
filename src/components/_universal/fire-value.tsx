"use client"

import { FireIcon } from "@/lib/assets"

import { PRIMARY_COLOR } from "@/config"

export const FireValue = ({ value }: { value?: number }) => (
  <span className={"text-primary flex items-center"} color={PRIMARY_COLOR}>
    <span className={"h-4 w-4"}>
      <FireIcon />
    </span>

    {value ?? "??"}
  </span>
)
