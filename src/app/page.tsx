"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useEffect } from "react"
import { AppTab } from "@/components/app-tab"
import TaskPage from "@/app/task/page_"
import { useSearchParams } from "next/navigation"
import { MyUser } from "@/ds/user"
import { useAppData } from "@/hooks/use-app-data"
import {
  getAdminBroadcastId,
  getBroadcastId,
  pusherClient,
  SocketEventType,
} from "@/lib/socket"
import { UserType } from "@prisma/client"
import ChatPage from "@/app/chat/home"
import { NavBars } from "@/components/nav"
import { FloatActionButton } from "@/components/float-action-button"
import { signOut, useSession } from "next-auth/react"
import UserPage from "./user/page_"
import { IClientMessage } from "@/ds/message"
import { toast } from "sonner"

function Home({ user }: { user: MyUser }) {
  const tabInUrl = useSearchParams().get("tab")
  const { appTab, setAppTab, targetUserId, setTargetUserId, setNewMessages } =
    useAppData()

  useEffect(() => {
    const channels: string[] = []

    // 监听自己（所有发给自己的消息）
    channels.push(user.id)

    // 监听所有的room
    channels.push(...user.rooms.map((room) => room.id))

    // 监听广播（博主监听这个，从而能在列表页实时收到最新的）
    if (targetUserId) channels.push(getBroadcastId(targetUserId))

    console.log("-- bound channels: ", channels)

    channels.forEach((channelId) => pusherClient.subscribe(channelId))

    pusherClient.bind(SocketEventType.Message, (message: IClientMessage) => {
      console.log("-- received message: ", message)
      // 倒序
      setNewMessages((messages) => [message, ...messages])
    })

    return () => {
      channels.forEach((channelId) => pusherClient.unsubscribe(channelId))
      pusherClient.unbind(SocketEventType.Message)
    }
  }, [targetUserId])

  // console.log("-- Home: ", { tabInUrl, appTab, user })

  return (
    <Tabs
      className={"h-full flex flex-col "}
      value={appTab}
      onValueChange={(value) => setAppTab(value as AppTab)}
    >
      <div className={"grow relative overflow-hidden"}>
        <TabsContent value={AppTab.chat} className={"h-full overflow-auto m-0"}>
          <ChatPage user={user} />
        </TabsContent>

        <TabsContent value={AppTab.fire} className={"h-full overflow-auto m-0"}>
          <TaskPage user={user} />
        </TabsContent>

        <TabsContent value={AppTab.shop} className={"h-full overflow-auto m-0"}>
          <UserPage user={user} />
        </TabsContent>

        <div className={"absolute right-4 bottom-16"}>
          {user?.type === "blogger" && <FloatActionButton />}
        </div>
      </div>

      <NavBars tab={appTab} />
    </Tabs>
  )
}

export default function HomePage() {
  const session = useSession()
  const user = session.data?.user

  const { targetUserId, setTargetUserId } = useAppData()

  console.log("-- home: ", { session })

  // return JSON.stringify(session, null, 2)
  if (!user) return "loading user..."

  // todo: in middleware
  if (!user?.phone) {
    toast.error("user failed to authenticate, re-login...", { duration: 0 })
    signOut()
    return
  }

  return <Home user={user} />
}
