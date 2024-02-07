import { AppTab, AppTabComp } from "@/components/nav-tab"
import { TabsList } from "@/components/ui/tabs"
import { FireIcon, Menu1Icon, Menu3Icon } from "@/lib/assets"

export const NavBars = ({ tab }: { tab: AppTab }) => {
  return (
    <TabsList className="shrink-0 grid grid-cols-3 p-2 bg-black h-fit">
      <AppTabComp tab={tab} value={AppTab.chat}>
        <Menu1Icon />
      </AppTabComp>

      <AppTabComp tab={tab} value={AppTab.fire}>
        {/*<RiFireFill className={"scale-150"} />*/}
        <FireIcon className={"scale-150"} />
      </AppTabComp>

      <AppTabComp tab={tab} value={AppTab.shop}>
        <Menu3Icon />
      </AppTabComp>
    </TabsList>
  )
}
