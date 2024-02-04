import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutTaskChoiceInputSchema } from './UserUpdateWithoutTaskChoiceInputSchema';
import { UserUncheckedUpdateWithoutTaskChoiceInputSchema } from './UserUncheckedUpdateWithoutTaskChoiceInputSchema';

export const UserUpdateWithWhereUniqueWithoutTaskChoiceInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutTaskChoiceInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutTaskChoiceInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTaskChoiceInputSchema) ]),
}).strict();

export default UserUpdateWithWhereUniqueWithoutTaskChoiceInputSchema;
