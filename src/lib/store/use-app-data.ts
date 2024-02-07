import { createBearStore } from "@/lib/store/utils/create-bear-store"

import { IMessageView } from "@/schema/message.base"

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
