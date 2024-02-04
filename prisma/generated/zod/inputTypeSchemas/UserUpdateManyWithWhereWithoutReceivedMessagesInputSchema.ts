import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';
import { UserUpdateManyMutationInputSchema } from './UserUpdateManyMutationInputSchema';
import { UserUncheckedUpdateManyWithoutReceivedMessagesInputSchema } from './UserUncheckedUpdateManyWithoutReceivedMessagesInputSchema';

export const UserUpdateManyWithWhereWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutReceivedMessagesInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutReceivedMessagesInputSchema) ]),
}).strict();

export default UserUpdateManyWithWhereWithoutReceivedMessagesInputSchema;
