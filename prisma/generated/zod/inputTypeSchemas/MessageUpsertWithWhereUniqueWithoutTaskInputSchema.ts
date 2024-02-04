import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutTaskInputSchema } from './MessageUpdateWithoutTaskInputSchema';
import { MessageUncheckedUpdateWithoutTaskInputSchema } from './MessageUncheckedUpdateWithoutTaskInputSchema';
import { MessageCreateWithoutTaskInputSchema } from './MessageCreateWithoutTaskInputSchema';
import { MessageUncheckedCreateWithoutTaskInputSchema } from './MessageUncheckedCreateWithoutTaskInputSchema';

export const MessageUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutTaskInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutTaskInputSchema),z.lazy(() => MessageUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export default MessageUpsertWithWhereUniqueWithoutTaskInputSchema;
