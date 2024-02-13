import { PropsWithChildren } from "react"

export const VerticalContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        "py-8 px-4 flex flex-col items-center gap-4 h-full overflow-auto"
      }
    >
      {children}
    </div>
  )
}
