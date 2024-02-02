"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useState } from "react";
import { AppTab, AppTabComp } from "@/components/app-tab";
import { useUser } from "@/hooks/use-user";
import Assets from "@/components/assets";
import TaskPage from "@/app/task/page";
import ChatPage from "@/components/chat-page";
import HomePage from "./home/page";

export default function Home() {
  // noStore();

  const [tab, setTab] = useState<AppTab>(AppTab.fire);
  const { user } = useUser();
  console.log("-- tab: ", { tab, user });

  return (
    <Tabs
      className={"h-full overflow-hidden flex flex-col"}
      value={tab}
      onValueChange={(value) => setTab(value as AppTab)}
    >
      <TabsContent value={AppTab.chat} className={"grow overflow-auto m-0"}>
        {user ? <ChatPage roomId={`${user.id}-jiugu`} /> : "请登录后再试！"}
      </TabsContent>

      <TabsContent value={AppTab.fire} className={"grow overflow-auto m-0"}>
        <TaskPage />
      </TabsContent>

      <TabsContent value={AppTab.shop} className={"grow overflow-auto m-0"}>
        <HomePage />
      </TabsContent>

      <NavBars tab={tab} />
    </Tabs>
  );
}

const NavBars = ({ tab }: { tab: AppTab }) => {
  return (
    <TabsList className="shrink-0 grid grid-cols-3 p-2 bg-black h-fit">
      <AppTabComp tab={tab} value={AppTab.chat}>
        <Assets.Menu1Icon />
      </AppTabComp>

      <AppTabComp tab={tab} value={AppTab.fire}>
        {/*<RiFireFill className={"scale-150"} />*/}
        <Assets.FireIcon className={"scale-150"} />
      </AppTabComp>

      <AppTabComp tab={tab} value={AppTab.shop}>
        <Assets.Menu3Icon />
      </AppTabComp>
    </TabsList>
  );
};
