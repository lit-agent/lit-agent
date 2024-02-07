import { PropsWithChildren } from "react"
import { FireIcon, Menu1Icon, Menu3Icon } from "@/lib/assets"
import { NavTabLink } from "@/components/nav-tab"

export default async function NavProvider({ children }: PropsWithChildren) {
  return (
    <div className={"h-full overflow-hidden flex flex-col"}>
      <div className={"grow overflow-auto"}>{children}</div>

      <div className="w-full shrink-0 grid grid-cols-3 p-2 bg-black gap-2">
        <NavTabLink href={"/chat"}>
          <Menu1Icon />
        </NavTabLink>

        <NavTabLink href={"/room"}>
          <FireIcon className={"scale-150"} />
        </NavTabLink>

        <NavTabLink href={"/user-home"}>
          <Menu3Icon />
        </NavTabLink>
      </div>
    </div>
  )
}
