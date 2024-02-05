"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useEffect } from "react"
import { AppTab } from "@/components/app-tab"
import TaskPage from "@/app/task/page_"
import { useSearchParams } from "next/navigation"
import { ClientMessage, MyUser } from "@/ds/user"
import { useAppData } from "@/hooks/use-app-data"
import { pusherClient } from "@/lib/pusher"
import { SocketEventType } from "@/ds/socket"
import { UserType } from "@prisma/client"
import ChatPage from "@/app/chat/home"
import { NavBars } from "@/components/nav"
import { FloatActionButton } from "@/components/float-action-button"
import { useSession } from "next-auth/react"
import UserPage from "./user/page_"
import { getFollowRelativeUsers } from "@/lib/follow"
import { getChatChannelId } from "@/lib/channel"

export function Home({ user }: { user: MyUser }) {
  const tabInUrl = useSearchParams().get("tab")
  const { appTab, setAppTab, targetUserId, setUnreadMessages, unreadMessages } =
    useAppData()

  useEffect(() => {
    const channels: string[] = getFollowRelativeUsers(user).map((user) =>
      getChatChannelId(user.id, user.id),
    )
    // 用户监听广播
    if (user.type === UserType.user && targetUserId)
      channels.push(`${targetUserId}_broadcast`)

    console.log("-- bound channels: ", channels)

    channels.forEach((channelId) => pusherClient.subscribe(channelId))

    pusherClient.bind(SocketEventType.Message, (message: ClientMessage) => {
      console.log("-- received message: ", message)
      setUnreadMessages((unreadMessages) => [...unreadMessages, message])
    })

    return () => {
      channels.forEach((channelId) => {
        pusherClient.unsubscribe(channelId)
      })
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
  if (!user) return "loading user..."
  return <Home user={user} />
}
