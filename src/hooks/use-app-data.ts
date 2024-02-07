import { createBearStore } from "@/lib/create-bear-store"
import { AppTab } from "@/components/nav-tab"

import { USER_AI_FOR_ALL_ID } from "@/const"

import { IMessageView } from "@/ds/message.base"

const useNavBear = createBearStore<AppTab>()("appTab", AppTab.chat, true)

const useTargetUserIdBear = createBearStore<string | null>()(
  "targetUserId",
  null,
  true,
)

const useMessagesBear = createBearStore<IMessageView[]>()("messages", [], false)

export const useAppData = () => {
  return {
    ...useNavBear(),
    ...useTargetUserIdBear(),
    ...useMessagesBear(),
  }
}
