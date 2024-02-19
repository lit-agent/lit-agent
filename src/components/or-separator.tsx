import { Separator } from "@/components/ui/separator"

export const OrSeparator = () => (
  <div className={"w-full px-4 flex items-center justify-center gap-4"}>
    <Separator orientation={"horizontal"} />
    <div className={"shrink-0 text-muted-foreground text-xs"}>或者</div>
    <Separator orientation={"horizontal"} />
  </div>
)