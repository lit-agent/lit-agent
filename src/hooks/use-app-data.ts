import { createBearStore } from "@/lib/create-bear-store"
import { AppTab } from "@/components/app-tab"

import { USER_AI_FOR_ALL_ID } from "@/const"
import { ClientMessage } from "@/ds/message"

const useNavBear = createBearStore<AppTab>()("appTab", AppTab.chat, true)

const useTargetUserIdBear = createBearStore<string | null>()(
  "targetUserId",
  null,
  true,
)

const useUnreadMessagesBear = createBearStore<ClientMessage[]>()(
  "unreadMessages",
  [],
  true,
)

export const useAppData = () => {
  return {
    ...useNavBear(),
    ...useTargetUserIdBear(),
    ...useUnreadMessagesBear(),
  }
}
