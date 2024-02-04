import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutReceivedMessagesInputSchema } from './UserUpdateWithoutReceivedMessagesInputSchema';
import { UserUncheckedUpdateWithoutReceivedMessagesInputSchema } from './UserUncheckedUpdateWithoutReceivedMessagesInputSchema';
import { UserCreateWithoutReceivedMessagesInputSchema } from './UserCreateWithoutReceivedMessagesInputSchema';
import { UserUncheckedCreateWithoutReceivedMessagesInputSchema } from './UserUncheckedCreateWithoutReceivedMessagesInputSchema';

export const UserUpsertWithWhereUniqueWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutReceivedMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema) ]),
}).strict();

export default UserUpsertWithWhereUniqueWithoutReceivedMessagesInputSchema;
