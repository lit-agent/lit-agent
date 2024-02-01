import { createBearStore } from "src/lib/create-bear-store";
import { User } from "@prisma/client";

const INTRO_START_STEP = 5;

const useValidatingBear = createBearStore<boolean>()(
  "validating",
  false,
  false,
);

const useIntroStepBear = createBearStore<number>()(
  "introStep",
  INTRO_START_STEP,
  false,
);
const useIntroStatusBear = createBearStore<boolean>()(
  "introStatus",
  true,
  false,
);

export type Validation = Record<string, number[]>;
const useAnswer = createBearStore<Validation>()("answer", {}, false);

/**
 * todo: use Context
 */
export const useValidation = () => {
  return {
    ...useValidatingBear(),
    ...useIntroStepBear(),
    ...useIntroStatusBear(),
    ...useAnswer(),
  };
};
