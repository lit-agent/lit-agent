"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useEffect } from "react"
import { AppTab } from "@/components/app-tab"
import TaskPage from "@/app/task/page_"
import { useSearchParams } from "next/navigation"
import { MyUser } from "@/ds/user"
import { useAppData } from "@/hooks/use-app-data"
import { pusherClient, SocketEventType } from "@/lib/socket"
import { UserType } from "@prisma/client"
import ChatPage from "@/app/chat/home"
import { NavBars } from "@/components/nav"
import { FloatActionButton } from "@/components/float-action-button"
import { signOut, useSession } from "next-auth/react"
import UserPage from "./user/page_"
import { ClientMessage } from "@/ds/message"

function Home({ user }: { user: MyUser }) {
  const tabInUrl = useSearchParams().get("tab")
  const {
    appTab,
    setAppTab,
    targetUserId,
    setTargetUserId,
    setUnreadMessages,
    unreadMessages,
  } = useAppData()

  useEffect(() => {
    // 监听所有的room即可
    const channels = user.rooms.map((room) => room.id)

    // 监听广播（博主监听这个，从而能在列表页实时收到最新的）
    channels.push(`${targetUserId}_broadcast`)

    console.log("-- bound channels: ", channels)

    channels.forEach((channelId) => pusherClient.subscribe(channelId))

    pusherClient.bind(SocketEventType.Message, (message: ClientMessage) => {
      console.log("-- received message: ", message)
      setUnreadMessages((unreadMessages) => [...unreadMessages, message])
    })

    return () => {
      channels.forEach((channelId) => pusherClient.unsubscribe(channelId))
      pusherClient.unbind(SocketEventType.Message)
    }
  }, [])

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

        {user?.type === "blogger" && <FloatActionButton />}
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

  // 浏览器初始化
  useEffect(() => {
    if (!user) return

    if (user.toRelations.length && !targetUserId) {
      setTargetUserId(user.toRelations[0]!.toUser.id)
    }
  }, [JSON.stringify(user)])

  // return JSON.stringify(session, null, 2)
  if (!user) return "loading user..."

  // todo: in middleware
  if (!user?.phone) {
    signOut()
    return "user failed to authenticate, re-login..."
  }

  if (user.type === UserType.user && !targetUserId)
    return (
      <div>
        <div>setting target user...</div>
        <div className={"whitespace-pre-wrap"}>
          {JSON.stringify(user, null, 2)}
        </div>
      </div>
    )

  return <Home user={user} />
}
