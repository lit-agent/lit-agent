import { forwardRef } from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"

export const MenuItem = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ name, className, children, ...props }, ref) => (
    <Button
      className={cn(
        "justify-between bg-transparent border-b border-white/10 rounded-none last:border-none h-fit relative",
        className,
      )}
      {...props}
      ref={ref}
    >
      <div className={"text-white"}>{name}</div>

      <div className={"text-muted-foreground flex items-center gap-1"}>
        {children}

        <ChevronRightIcon className={"w-5 h-5"} />
      </div>
    </Button>
  ),
)
