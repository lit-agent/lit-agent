import { createBearStore } from "@/lib/create-bear-store"
import { MessageType, SupportedMessageTypes } from "@/ds/message.base"

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
