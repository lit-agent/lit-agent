import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutTaskChoiceInputSchema } from './UserCreateWithoutTaskChoiceInputSchema';
import { UserUncheckedCreateWithoutTaskChoiceInputSchema } from './UserUncheckedCreateWithoutTaskChoiceInputSchema';

export const UserCreateOrConnectWithoutTaskChoiceInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTaskChoiceInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTaskChoiceInputSchema),z.lazy(() => UserUncheckedCreateWithoutTaskChoiceInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutTaskChoiceInputSchema;
