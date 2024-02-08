"use client"

import { PropsWithChildren, useEffect } from "react"

export const AutoHeightThread = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const setInnerHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`,
      )
    }
    window.addEventListener("resize", setInnerHeight)

    setInnerHeight()
    return () => {
      window.removeEventListener("resize", setInnerHeight)
    }
  }, [])

  return null
}
