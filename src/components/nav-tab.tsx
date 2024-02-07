import { PropsWithChildren } from "react"
import { TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Link from "next/link"

export enum AppTab {
  chat = "chat",
  fire = "fire",
  shop = "shop",
}

export const AppTabComp = ({
  tab,
  value,
  children,
}: { tab: AppTab; value: AppTab } & PropsWithChildren) => (
  <TabsTrigger
    value={value}
    className={"data-[state=active]:bg-transparent transition-all"}
  >
    <div
      className={cn(
        "w-8 h-8 p-2 rounded-full ",
        tab === value && "bg-primary ",
      )}
    >
      {children}
    </div>
  </TabsTrigger>
)

export const AppTabLinkComp = ({
  href,
  children,
}: { href: string } & PropsWithChildren) => (
  <Link
    href={href}
    className={
      "data-[state=active]:bg-transparent transition-all w-full flex justify-center"
    }
  >
    <div
      className={cn(
        "w-8 h-8 p-2 rounded-full",
        // tab === value && "bg-primary ",
      )}
    >
      {children}
    </div>
  </Link>
)
