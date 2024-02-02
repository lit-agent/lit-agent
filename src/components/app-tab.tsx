import { PropsWithChildren } from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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
);
