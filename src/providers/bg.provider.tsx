import { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { bgModel } from "@/config"

export default function BgProvider({ children }: PropsWithChildren) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-0 h-full w-full",
          "pointer-events-none",
          bgModel === "mirror"
            ? "scale-125 blur-lg brightness-[15%]"
            : "bg-background",
        )}
      >
        {bgModel === "plain" ? null : children}
      </div>

      <div className={"absolute inset-0 flex h-full w-full justify-center"}>
        <div className={"bg-muted w-full max-w-screen-sm"}>{children}</div>
      </div>
    </>
  )
}
