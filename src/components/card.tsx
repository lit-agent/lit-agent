import { PropsWithChildren, ReactNode } from "react"
import { cn } from "@/lib/utils"

export const Card1 = ({
  a,
  b,
  c,
  d,
  side,
}: {
  a: ReactNode
  b: number | string
  c: ReactNode
  d: number | string
  side: "L" | "R"
}) => (
  <div className={cn("flex flex-col gap-2", side === "R" && "items-end")}>
    <div className={"text-gray-300"}>{a}</div>
    <div className={"text-white text-2xl font-medium"}>{b}</div>
    <div className={"text-gray-300"}>{c}</div>
    <div className={"text-gray-300"}>{d}</div>
  </div>
)

export const Card2 = ({ children }: PropsWithChildren) => (
  <div className={"m-2 bg-[#2A2435]"}>
    <div className={"rounded p-2 bg-[#3D3847]"}>{children}</div>
  </div>
)
