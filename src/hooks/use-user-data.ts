import { createBearStore } from "@/lib/create-bear-store";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { MessageType } from "@/ds/message";

const useTargetUserBear = createBearStore<User | null>()(
  "targetUser",
  null,
  true,
);
const usePreferredRequirementType = createBearStore<MessageType>()(
  "preferredMessageType",
  MessageType.Task,
  true,
);

export const useUserData = () => {
  const session = useSession();
  // console.log("-- session: ", session);
  return {
    user: session.data?.user,
    ...useTargetUserBear(),
    ...usePreferredRequirementType(),
  };
};
