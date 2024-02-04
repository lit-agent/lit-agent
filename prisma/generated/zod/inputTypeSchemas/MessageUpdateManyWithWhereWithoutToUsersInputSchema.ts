import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';
import { MessageUpdateManyMutationInputSchema } from './MessageUpdateManyMutationInputSchema';
import { MessageUncheckedUpdateManyWithoutToUsersInputSchema } from './MessageUncheckedUpdateManyWithoutToUsersInputSchema';

export const MessageUpdateManyWithWhereWithoutToUsersInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutToUsersInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutToUsersInputSchema) ]),
}).strict();

export default MessageUpdateManyWithWhereWithoutToUsersInputSchema;
