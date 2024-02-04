import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutSentMessagesInputSchema } from './UserCreateWithoutSentMessagesInputSchema';
import { UserUncheckedCreateWithoutSentMessagesInputSchema } from './UserUncheckedCreateWithoutSentMessagesInputSchema';
import { UserCreateOrConnectWithoutSentMessagesInputSchema } from './UserCreateOrConnectWithoutSentMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSentMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSentMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutSentMessagesInputSchema;
