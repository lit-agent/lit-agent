"use client"

import { FireIcon } from "@/lib/assets"

import { PRIMARY_COLOR } from "@/const"

export const Hot = ({ value }: { value: number }) => (
  <div className={"text-primary flex items-center"} color={PRIMARY_COLOR}>
    <div className={"h-4 w-4"}>
      <FireIcon />
    </div>

    {value}
  </div>
)
