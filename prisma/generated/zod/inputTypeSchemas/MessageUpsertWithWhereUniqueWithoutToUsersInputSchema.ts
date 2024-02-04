import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutToUsersInputSchema } from './MessageUpdateWithoutToUsersInputSchema';
import { MessageUncheckedUpdateWithoutToUsersInputSchema } from './MessageUncheckedUpdateWithoutToUsersInputSchema';
import { MessageCreateWithoutToUsersInputSchema } from './MessageCreateWithoutToUsersInputSchema';
import { MessageUncheckedCreateWithoutToUsersInputSchema } from './MessageUncheckedCreateWithoutToUsersInputSchema';

export const MessageUpsertWithWhereUniqueWithoutToUsersInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutToUsersInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutToUsersInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutToUsersInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutToUsersInputSchema),z.lazy(() => MessageUncheckedCreateWithoutToUsersInputSchema) ]),
}).strict();

export default MessageUpsertWithWhereUniqueWithoutToUsersInputSchema;
