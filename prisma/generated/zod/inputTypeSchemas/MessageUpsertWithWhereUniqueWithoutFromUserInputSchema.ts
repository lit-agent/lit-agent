import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutFromUserInputSchema } from './MessageUpdateWithoutFromUserInputSchema';
import { MessageUncheckedUpdateWithoutFromUserInputSchema } from './MessageUncheckedUpdateWithoutFromUserInputSchema';
import { MessageCreateWithoutFromUserInputSchema } from './MessageCreateWithoutFromUserInputSchema';
import { MessageUncheckedCreateWithoutFromUserInputSchema } from './MessageUncheckedCreateWithoutFromUserInputSchema';

export const MessageUpsertWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutFromUserInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutFromUserInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutFromUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export default MessageUpsertWithWhereUniqueWithoutFromUserInputSchema;
