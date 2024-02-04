import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageCreateWithoutToUsersInputSchema } from './MessageCreateWithoutToUsersInputSchema';
import { MessageUncheckedCreateWithoutToUsersInputSchema } from './MessageUncheckedCreateWithoutToUsersInputSchema';

export const MessageCreateOrConnectWithoutToUsersInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutToUsersInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutToUsersInputSchema),z.lazy(() => MessageUncheckedCreateWithoutToUsersInputSchema) ]),
}).strict();

export default MessageCreateOrConnectWithoutToUsersInputSchema;
