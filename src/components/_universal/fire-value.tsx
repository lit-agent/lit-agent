"use client"

import { FireIcon } from "@/lib/assets"

import { PRIMARY_COLOR } from "@/config"

export const FireValue = ({ value }: { value?: number }) => (
  <div className={"text-primary flex items-center"} color={PRIMARY_COLOR}>
    <div className={"h-4 w-4"}>
      <FireIcon />
    </div>

    {value ?? "??"}
  </div>
)
