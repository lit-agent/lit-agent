import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutSentMessagesInputSchema } from './UserUpdateWithoutSentMessagesInputSchema';
import { UserUncheckedUpdateWithoutSentMessagesInputSchema } from './UserUncheckedUpdateWithoutSentMessagesInputSchema';
import { UserCreateWithoutSentMessagesInputSchema } from './UserCreateWithoutSentMessagesInputSchema';
import { UserUncheckedCreateWithoutSentMessagesInputSchema } from './UserUncheckedCreateWithoutSentMessagesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutSentMessagesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutSentMessagesInputSchema;
