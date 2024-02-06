"use client"

import useAppAutoMobileHeight from "@/hooks/use-app-auto-mobile-height"
import { PropsWithChildren } from "react"

export const AppAutoMobileHeightProvider = ({
  children,
}: PropsWithChildren) => {
  useAppAutoMobileHeight()

  return <>{children}</>
}
