"use client"

import { PropsWithChildren, useState } from "react"
import { FireIcon, Menu1Icon, Menu3Icon } from "@/lib/assets"
import { NavTabLink } from "@/components/nav-tab"
import { UserType } from "@prisma/client"
import { ActionEntrance } from "@/components/action-entrance"
import { useSession } from "next-auth/react"

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

      <div className="w-full shrink-0 grid grid-cols-3 p-2 bg-black gap-2">
        <NavTabLink
          href={"/chat"}
          onClick={() => setSelected(1)}
          isSelected={selected === 1}
        >
          <Menu1Icon />
        </NavTabLink>

        <NavTabLink
          href={"/me"}
          onClick={() => setSelected(2)}
          isSelected={selected === 2}
        >
          <FireIcon className={"scale-150"} />
        </NavTabLink>

        <NavTabLink
          href={"/home"}
          onClick={() => setSelected(3)}
          isSelected={selected === 3}
        >
          <Menu3Icon />
        </NavTabLink>
      </div>
    </div>
  )
}
