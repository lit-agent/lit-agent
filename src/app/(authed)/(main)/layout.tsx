"use client"
import { ComponentProps, PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { ActionEntrance } from "@/components/_universal/action-entrance"
import { BiGame } from "react-icons/bi"
import { GrAppleAppStore } from "react-icons/gr"
import { GoPerson } from "react-icons/go"
import Link from "next/link"
import { UserType } from "@prisma/client"
import { useUser } from "@/hooks/use-user"
import { usePathname } from "next/navigation"

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={"h-full overflow-hidden flex flex-col"}>
      <ContentArea>{children}</ContentArea>

      <NavBars />
    </div>
  )
}

const ContentArea = ({ children }: PropsWithChildren) => {
  const { mainUser: user } = useUser()
  const isBlogger = user?.type === UserType.blogger

  return (
    <div
      className={cn(
        "grow overflow-hidden relative", // 为了博主发布的固定位置
        "p-4 -m-4", // 为了滚动条不遮住内容
      )}
    >
      <div className={"h-full overflow-y-auto p-4"}>{children}</div>

      {isBlogger && (
        <div className={"absolute right-8 bottom-8"}>
          <ActionEntrance />
        </div>
      )}
    </div>
  )
}

const NavBars = () => {
  const pathname = usePathname()
  // console.log({ pathname })

  return (
    <div className="w-full shrink-0 grid grid-cols-3 p-2 bg-black gap-2">
      <NavTabLink href={"/task"} isSelected={pathname === "/task"}>
        <BiGame />
      </NavTabLink>

      <NavTabLink href={"/product"} isSelected={pathname === "/product"}>
        <GrAppleAppStore />
      </NavTabLink>

      <NavTabLink href={"/"} isSelected={pathname === "/"}>
        <GoPerson />
      </NavTabLink>
    </div>
  )
}

const NavTabLink = ({
  isSelected,
  children,
  ...props
}: ComponentProps<typeof Link> & { isSelected: boolean }) => (
  <Link
    className={
      "data-[state=active]:bg-transparent transition-all w-full flex justify-center"
    }
    {...props}
  >
    <div
      className={cn(
        "w-8 h-8 p-2 rounded-full hover:bg-primary/75",
        isSelected && "bg-primary",
      )}
    >
      {children}
    </div>
  </Link>
)
