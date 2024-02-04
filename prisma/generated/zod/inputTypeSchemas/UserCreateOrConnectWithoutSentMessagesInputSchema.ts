import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutSentMessagesInputSchema } from './UserCreateWithoutSentMessagesInputSchema';
import { UserUncheckedCreateWithoutSentMessagesInputSchema } from './UserUncheckedCreateWithoutSentMessagesInputSchema';

export const UserCreateOrConnectWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSentMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutSentMessagesInputSchema;
