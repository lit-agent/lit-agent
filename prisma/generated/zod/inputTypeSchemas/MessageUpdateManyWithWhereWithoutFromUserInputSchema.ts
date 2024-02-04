import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';
import { MessageUpdateManyMutationInputSchema } from './MessageUpdateManyMutationInputSchema';
import { MessageUncheckedUpdateManyWithoutFromUserInputSchema } from './MessageUncheckedUpdateManyWithoutFromUserInputSchema';

export const MessageUpdateManyWithWhereWithoutFromUserInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutFromUserInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutFromUserInputSchema) ]),
}).strict();

export default MessageUpdateManyWithWhereWithoutFromUserInputSchema;
