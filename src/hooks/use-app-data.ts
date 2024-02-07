import { createBearStore } from "@/lib/create-bear-store"

import { IMessageView } from "@/ds/message.base"

const useTargetUserIdBear = createBearStore<string | null>()(
  "targetUserId",
  null,
  true,
)

const useMessagesBear = createBearStore<IMessageView[]>()("messages", [], false)

export const useAppData = () => {
  return {
    ...useTargetUserIdBear(),
    ...useMessagesBear(),
  }
}
