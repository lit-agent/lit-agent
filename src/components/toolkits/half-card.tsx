import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export const HalfCard = ({
  a,
  b,
  c,
  d,
  side,
}: {
  a: ReactNode
  b: number
  c: ReactNode
  d: number
  side: "L" | "R"
}) => (
  <div className={cn("flex flex-col gap-2", side === "R" && "items-end")}>
    <div className={"text-gray-300"}>{a}</div>
    <div className={"text-white text-2xl font-medium"}>{b}</div>
    <div className={"text-gray-300"}>{c}</div>
    <div className={"text-gray-300"}>{d}</div>
  </div>
)
