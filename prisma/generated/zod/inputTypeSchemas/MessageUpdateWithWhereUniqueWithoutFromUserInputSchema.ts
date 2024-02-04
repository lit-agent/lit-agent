import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutFromUserInputSchema } from './MessageUpdateWithoutFromUserInputSchema';
import { MessageUncheckedUpdateWithoutFromUserInputSchema } from './MessageUncheckedUpdateWithoutFromUserInputSchema';

export const MessageUpdateWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutFromUserInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutFromUserInputSchema) ]),
}).strict();

export default MessageUpdateWithWhereUniqueWithoutFromUserInputSchema;
