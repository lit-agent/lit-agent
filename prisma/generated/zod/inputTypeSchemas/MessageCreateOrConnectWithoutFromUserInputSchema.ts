import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageCreateWithoutFromUserInputSchema } from './MessageCreateWithoutFromUserInputSchema';
import { MessageUncheckedCreateWithoutFromUserInputSchema } from './MessageUncheckedCreateWithoutFromUserInputSchema';

export const MessageCreateOrConnectWithoutFromUserInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutFromUserInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutFromUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export default MessageCreateOrConnectWithoutFromUserInputSchema;
