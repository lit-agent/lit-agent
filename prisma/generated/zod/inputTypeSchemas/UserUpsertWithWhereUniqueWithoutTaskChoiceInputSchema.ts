import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutTaskChoiceInputSchema } from './UserUpdateWithoutTaskChoiceInputSchema';
import { UserUncheckedUpdateWithoutTaskChoiceInputSchema } from './UserUncheckedUpdateWithoutTaskChoiceInputSchema';
import { UserCreateWithoutTaskChoiceInputSchema } from './UserCreateWithoutTaskChoiceInputSchema';
import { UserUncheckedCreateWithoutTaskChoiceInputSchema } from './UserUncheckedCreateWithoutTaskChoiceInputSchema';

export const UserUpsertWithWhereUniqueWithoutTaskChoiceInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutTaskChoiceInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutTaskChoiceInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTaskChoiceInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTaskChoiceInputSchema),z.lazy(() => UserUncheckedCreateWithoutTaskChoiceInputSchema) ]),
}).strict();

export default UserUpsertWithWhereUniqueWithoutTaskChoiceInputSchema;
