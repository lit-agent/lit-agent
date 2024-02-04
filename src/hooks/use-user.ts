import { createBearStore } from "@/lib/create-bear-store";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

const useTargetUserBear = createBearStore<User | null>()(
  "targetUser",
  null,
  true,
);

export const useUser = () => {
  const session = useSession();
  // console.log("-- session: ", session);
  return {
    user: session.data?.user,
    ...useTargetUserBear(),
  };
};
