import { createBearStore } from "@/lib/create-bear-store"
import { useSession } from "next-auth/react"
import { MessageType, SupportedMessageTypes } from "@/ds/message.base"

const usePreferredRequirementTypeBear =
  createBearStore<SupportedMessageTypes>()(
    "preferredMessageType",
    MessageType.Task,
    true,
  )

export const useUserPreference = () => {
  const session = useSession()
  return {
    user: session.data?.user,
    ...usePreferredRequirementTypeBear(),
  }
}
