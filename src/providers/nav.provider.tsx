import { PropsWithChildren } from "react"
import { FireIcon, Menu1Icon, Menu3Icon } from "@/lib/assets"
import { NavTabLink } from "@/components/nav-tab"
import { MyUser } from "@/ds/user"
import { UserType } from "@prisma/client"
import { ActionEntrance } from "@/components/toolkits/action-entrance"

export default async function NavProvider({
  children,
  user,
}: PropsWithChildren & { user?: MyUser }) {
  return (
    <div className={"h-full overflow-hidden flex flex-col"}>
      <div className={"grow overflow-auto relative"}>
        {children}

        {user?.type === UserType.blogger && (
          <div className={"absolute right-4 bottom-4"}>
            <ActionEntrance />
          </div>
        )}
      </div>

      <div className="w-full shrink-0 grid grid-cols-3 p-2 bg-black gap-2">
        <NavTabLink href={"/chat"}>
          <Menu1Icon />
        </NavTabLink>

        <NavTabLink href={"/fire"}>
          <FireIcon className={"scale-150"} />
        </NavTabLink>

        <NavTabLink href={"/user-home"}>
          <Menu3Icon />
        </NavTabLink>
      </div>
    </div>
  )
}
