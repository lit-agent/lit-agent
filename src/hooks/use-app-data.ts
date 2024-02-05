import { createBearStore } from "@/lib/create-bear-store";

const useNavBear = createBearStore<number>()("nav", 1, false);

export const useAppData = () => {
  return {
    ...useNavBear(),
  };
};
