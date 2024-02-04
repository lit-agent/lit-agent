import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutTaskInputSchema } from './MessageUpdateWithoutTaskInputSchema';
import { MessageUncheckedUpdateWithoutTaskInputSchema } from './MessageUncheckedUpdateWithoutTaskInputSchema';

export const MessageUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutTaskInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export default MessageUpdateWithWhereUniqueWithoutTaskInputSchema;
