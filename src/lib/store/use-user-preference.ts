import { createBearStore } from "@/lib/store/utils/create-bear-store"
import { MessageType, SupportedMessageTypes } from "@/schema/message.base"

const usePreferredRequirementTypeBear =
  createBearStore<SupportedMessageTypes>()(
    "preferredMessageType",
    MessageType.Task,
    true,
  )

export const useUserPreference = () => {
  return {
    ...usePreferredRequirementTypeBear(),
  }
}
