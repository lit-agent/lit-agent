import { createBearStore } from "@/lib/create-bear-store"
import { AppTab } from "@/components/app-tab"

import { USER_AI_FOR_ALL_ID } from "@/const"
import { IClientMessage } from "@/ds/message"

const useNavBear = createBearStore<AppTab>()("appTab", AppTab.chat, true)

const useTargetUserIdBear = createBearStore<string | null>()(
  "targetUserId",
  null,
  true,
)

const useNewMessagesBear = createBearStore<IClientMessage[]>()(
  "newMessages",
  [],
  false,
)

export const useAppData = () => {
  return {
    ...useNavBear(),
    ...useTargetUserIdBear(),
    ...useNewMessagesBear(),
  }
}
