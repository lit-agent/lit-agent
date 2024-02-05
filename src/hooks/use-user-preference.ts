import { createBearStore } from "@/lib/create-bear-store"
import { useSession } from "next-auth/react"
import { MessageType, SupportedMessageTypes } from "@/ds/message.base"
import { ClientMessage } from "@/ds/user"

const usePreferredRequirementTypeBear =
  createBearStore<SupportedMessageTypes>()(
    "preferredMessageType",
    MessageType.Task,
    true,
  )

export const useUserPreference = () => {
  const session = useSession()
  // console.log("-- session: ", session);
  return {
    user: session.data?.user,
    ...usePreferredRequirementTypeBear(),
  }
}
