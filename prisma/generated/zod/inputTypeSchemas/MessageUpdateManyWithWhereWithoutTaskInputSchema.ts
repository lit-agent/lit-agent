import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';
import { MessageUpdateManyMutationInputSchema } from './MessageUpdateManyMutationInputSchema';
import { MessageUncheckedUpdateManyWithoutTaskInputSchema } from './MessageUncheckedUpdateManyWithoutTaskInputSchema';

export const MessageUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export default MessageUpdateManyWithWhereWithoutTaskInputSchema;
