import { createBearStore } from "@/lib/create-bear-store";
import { User } from "@prisma/client";

const useUserBear = createBearStore<User | null>()("user", null, true);
const useTargetUserBear = createBearStore<User | null>()(
  "targetUser",
  null,
  true,
);

export const useUser = () => {
  return {
    ...useUserBear(),
    ...useTargetUserBear(),
  };
};
