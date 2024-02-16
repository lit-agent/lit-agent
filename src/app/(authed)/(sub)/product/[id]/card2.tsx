import { PropsWithChildren } from "react"

export const Card2 = ({ children }: PropsWithChildren) => (
  <div className={"bg-[#2A2435]"}>
    <div className={"rounded p-2 bg-[#3D3847]"}>{children}</div>
  </div>
)
