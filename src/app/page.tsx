"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useState } from "react";
import { AppTab, AppTabComp } from "@/components/app-tab";
import { useUser } from "@/hooks/use-user";
import Assets from "@/components/assets";
import TaskPage from "@/app/task/page";
import ChatPage from "@/components/chat-page";
import HomePage from "./home/page";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function Home() {
  // noStore();

  const [tab, setTab] = useState<AppTab>(AppTab.fire);
  const { user } = useUser();
  console.log("-- tab: ", { tab, user });

  return (
    <Tabs
      className={"h-full overflow-hidden flex flex-col "}
      value={tab}
      onValueChange={(value) => setTab(value as AppTab)}
    >
      <div className={"grow relative"}>
        <TabsContent value={AppTab.chat} className={"h-full m-0"}>
          {user ? <ChatPage roomId={`${user.id}-jiugu`} /> : "请登录后再试！"}
        </TabsContent>

        <TabsContent value={AppTab.fire} className={"h-full m-0"}>
          <TaskPage />
        </TabsContent>

        <TabsContent value={AppTab.shop} className={"h-full m-0"}>
          <HomePage />
        </TabsContent>

        {user?.type === "blogger" && <FloatActionButton />}
      </div>

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

const FloatActionButton = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        className={
          "bg-primary rounded-full absolute right-4 bottom-4 w-fit h-fit p-1 text-white"
        }
      >
        <PlusIcon />
      </Button>
    </DialogTrigger>

    <DialogContent>
      <Label>发布</Label>
      <Link href={"/task/create"}>
        <Button className={"w-full"}>发布新任务</Button>
      </Link>

      <Link href={"/product/create"}>
        <Button className={"w-full"}>发布新产品/服务</Button>
      </Link>

      <Label>管理</Label>
      <Link href={"/task/create"}>
        <Button className={"w-full"} disabled>
          管理用户
        </Button>
      </Link>
      <Link href={"/task/create"}>
        <Button className={"w-full"} disabled>
          管理新任务
        </Button>
      </Link>

      <Link href={"/product/create"}>
        <Button className={"w-full"} disabled>
          管理产品/服务
        </Button>
      </Link>
    </DialogContent>
  </Dialog>
);
