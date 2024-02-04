import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutSentMessagesInputSchema } from './UserUpdateWithoutSentMessagesInputSchema';
import { UserUncheckedUpdateWithoutSentMessagesInputSchema } from './UserUncheckedUpdateWithoutSentMessagesInputSchema';

export const UserUpdateToOneWithWhereWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSentMessagesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutSentMessagesInputSchema;
