import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageCreateWithoutTaskInputSchema } from './MessageCreateWithoutTaskInputSchema';
import { MessageUncheckedCreateWithoutTaskInputSchema } from './MessageUncheckedCreateWithoutTaskInputSchema';

export const MessageCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutTaskInputSchema),z.lazy(() => MessageUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export default MessageCreateOrConnectWithoutTaskInputSchema;
