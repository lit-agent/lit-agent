"use client"

import { HTMLAttributes } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SubPage({
  title,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { title: string }) {
  const router = useRouter()

  return (
    <div className={"h-full overflow-hidden flex flex-col bg-[#2A2335]"}>
      <div className={"grid grid-cols-3 items-center w-full p-4"}>
        <ChevronLeftIcon
          className={"w-6 h-6 text-muted-foreground"}
          onClick={() => {
            router.back()
          }}
        />

        <div
          className={
            "text-white/90 text-md font-medium grow truncate text-center"
          }
        >
          {title}
        </div>

        <div className={"flex items-center shrink-0"} />
      </div>

      <div className={cn("grow overflow-auto", className)} {...props} />
    </div>
  )
}
