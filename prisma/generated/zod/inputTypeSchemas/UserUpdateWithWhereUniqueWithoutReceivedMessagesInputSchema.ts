import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutReceivedMessagesInputSchema } from './UserUpdateWithoutReceivedMessagesInputSchema';
import { UserUncheckedUpdateWithoutReceivedMessagesInputSchema } from './UserUncheckedUpdateWithoutReceivedMessagesInputSchema';

export const UserUpdateWithWhereUniqueWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutReceivedMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]),
}).strict();

export default UserUpdateWithWhereUniqueWithoutReceivedMessagesInputSchema;
