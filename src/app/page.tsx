"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { AppTab } from "@/components/app-tab"
import TaskPage from "@/app/task/page_"
import { useSearchParams } from "next/navigation"
import { MyUser } from "@/ds/user"
import { useAppData } from "@/hooks/use-app-data"
import ChatPage from "@/app/chat/home"
import { NavBars } from "@/components/nav"
import { FloatActionButton } from "@/components/float-action-button"
import { signOut, useSession } from "next-auth/react"
import UserPage from "./user/page_"
import { toast } from "sonner"

function Home({ user }: { user: MyUser }) {
  const tabInUrl = useSearchParams().get("tab")
  const { appTab, setAppTab } = useAppData()

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

  console.log("[HomePage] data: ", { session })

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
