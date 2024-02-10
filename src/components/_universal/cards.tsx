import { PropsWithChildren } from "react"

export const GrayCard = ({ children }: PropsWithChildren) => (
  <div className={"rounded-lg bg-[#3B3545] p-2 flex flex-col gap-2"}>
    {children}
  </div>
)