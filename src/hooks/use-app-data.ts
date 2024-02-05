import { createBearStore } from "@/lib/create-bear-store"
import { AppTab } from "@/components/app-tab"
import { ClientMessage } from "@/ds/user"
import { USER_AI_FOR_ALL_ID } from "@/config"

const useNavBear = createBearStore<AppTab>()("appTab", AppTab.chat, true)

const useTargetUserIdBear = createBearStore<string | null>()(
  "targetUserId",
  null,
  false,
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
