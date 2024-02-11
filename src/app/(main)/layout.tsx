"use client"
import { ComponentProps, PropsWithChildren, useState } from "react"
import { cn } from "@/lib/utils"
import { ActionEntrance } from "@/components/_universal/action-entrance"
import { useGlobalMessages } from "@/hooks/use-messages"
import { toast } from "sonner"
import { TODO } from "@/config"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { BiGame } from "react-icons/bi"
import { GrAppleAppStore } from "react-icons/gr"
import { GoPerson } from "react-icons/go"
import Link from "next/link"
import { UserType } from "@prisma/client"
import { useUser } from "@/hooks/use-user"

export default function MainLayout({ children }: PropsWithChildren) {
  console.log("[MainLayout]")

  return (
    <div className={"h-full overflow-hidden flex flex-col"}>
      <ContentArea>{children}</ContentArea>

      <NavBars />
    </div>
  )
}

const ContentArea = ({ children }: PropsWithChildren) => {
  const user = useUser()
  const isBlogger = user?.type === UserType.blogger

  return (
    <div
      className={cn(
        "grow overflow-hidden relative", // 为了博主发布的固定位置
        "py-8 px-4 -m-4", // 为了滚动条不遮住内容
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
  useGlobalMessages()

  const [selected, setSelected] = useState(0)

  return (
    <div className="w-full shrink-0 grid grid-cols-3 p-2 bg-black gap-2">
      {/*<NavTabLink*/}
      {/*  href={""}*/}
      {/*  onClick={() => {*/}
      {/*    toast.info(TODO)*/}
      {/*    return*/}

      {/*    // todo: chat*/}
      {/*    setSelected(1)*/}
      {/*  }}*/}
      {/*  isSelected={selected === 1}*/}
      {/*>*/}
      {/*  <IoChatbubbleEllipsesOutline />*/}
      {/*</NavTabLink>*/}

      <NavTabLink
        href={"/task"}
        onClick={() => setSelected(2)}
        isSelected={selected === 2}
      >
        <BiGame />
      </NavTabLink>

      <NavTabLink
        href={"/product"}
        onClick={() => setSelected(3)}
        isSelected={selected === 3}
      >
        <GrAppleAppStore />
      </NavTabLink>

      <NavTabLink
        href={"/"}
        onClick={() => setSelected(4)}
        isSelected={selected === 4}
      >
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
