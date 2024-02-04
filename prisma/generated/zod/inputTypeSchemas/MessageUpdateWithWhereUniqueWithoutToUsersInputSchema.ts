import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutToUsersInputSchema } from './MessageUpdateWithoutToUsersInputSchema';
import { MessageUncheckedUpdateWithoutToUsersInputSchema } from './MessageUncheckedUpdateWithoutToUsersInputSchema';

export const MessageUpdateWithWhereUniqueWithoutToUsersInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutToUsersInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutToUsersInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutToUsersInputSchema) ]),
}).strict();

export default MessageUpdateWithWhereUniqueWithoutToUsersInputSchema;
