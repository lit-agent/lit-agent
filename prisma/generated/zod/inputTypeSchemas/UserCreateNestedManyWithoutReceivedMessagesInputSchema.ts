import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutReceivedMessagesInputSchema } from './UserCreateWithoutReceivedMessagesInputSchema';
import { UserUncheckedCreateWithoutReceivedMessagesInputSchema } from './UserUncheckedCreateWithoutReceivedMessagesInputSchema';
import { UserCreateOrConnectWithoutReceivedMessagesInputSchema } from './UserCreateOrConnectWithoutReceivedMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedManyWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutReceivedMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutReceivedMessagesInputSchema),z.lazy(() => UserCreateOrConnectWithoutReceivedMessagesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default UserCreateNestedManyWithoutReceivedMessagesInputSchema;
