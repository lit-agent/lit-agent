import { PropsWithChildren } from "react"
import { FireIcon, Menu1Icon, Menu3Icon } from "@/lib/assets"
import { AppTabLinkComp } from "@/components/nav-tab"
import { getServerUser } from "@/server/auth"

export default async function NavProvider({ children }: PropsWithChildren) {
  const user = await getServerUser()
  if (!user) return "[NavProvider]: no user yet"

  return (
    <div className={"h-full overflow-hidden flex flex-col"}>
      <div className={"grow overflow-auto"}>{children}</div>

      <div className="w-full shrink-0 grid grid-cols-3 p-2 bg-black gap-2">
        <AppTabLinkComp href={"/chat"}>
          <Menu1Icon />
        </AppTabLinkComp>

        <AppTabLinkComp href={"/task"}>
          <FireIcon className={"scale-150"} />
        </AppTabLinkComp>

        <AppTabLinkComp href={"/user-home"}>
          <Menu3Icon />
        </AppTabLinkComp>
      </div>
    </div>
  )
}
