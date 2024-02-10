"use client"

import { PropsWithChildren, useState } from "react"
import { FireIcon, Menu1Icon, Menu3Icon } from "@/lib/assets"
import { NavTabLink } from "@/components/nav-tab"
import { UserType } from "@prisma/client"
import { ActionEntrance } from "@/components/action-entrance"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { TODO } from "@/config"
import { BiGame } from "react-icons/bi"
import { GoPerson } from "react-icons/go"
import { GrAppleAppStore } from "react-icons/gr"
import { PiSnapchatLogoThin } from "react-icons/pi"
import { PiSnapchatLogoBold } from "react-icons/pi"
import { PiSnapchatLogo } from "react-icons/pi"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"

export default function NavProvider({ children }: PropsWithChildren) {
  const isBlogger = useSession().data?.user.type === UserType.blogger
  const [selected, setSelected] = useState(0)

  return (
    <div className={"h-full overflow-hidden flex flex-col"}>
      <div className={"grow overflow-hidden relative"}>
        <div className={"h-full overflow-y-auto"}>{children}</div>

        {isBlogger && (
          <div className={"absolute right-4 bottom-4"}>
            <ActionEntrance />
          </div>
        )}
      </div>

      <div className="w-full shrink-0 grid grid-cols-4 p-2 bg-black gap-2">
        <NavTabLink
          href={""}
          onClick={() => {
            toast.info(TODO)
            return
            setSelected(1)
          }}
          isSelected={selected === 1}
        >
          <IoChatbubbleEllipsesOutline />
        </NavTabLink>

        <NavTabLink
          href={"/playground"}
          onClick={() => setSelected(2)}
          isSelected={selected === 2}
        >
          <BiGame />
        </NavTabLink>

        <NavTabLink
          href={"/store"}
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
    </div>
  )
}
