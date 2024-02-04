import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateWithoutToUsersInputSchema } from './MessageCreateWithoutToUsersInputSchema';
import { MessageUncheckedCreateWithoutToUsersInputSchema } from './MessageUncheckedCreateWithoutToUsersInputSchema';
import { MessageCreateOrConnectWithoutToUsersInputSchema } from './MessageCreateOrConnectWithoutToUsersInputSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';

export const MessageCreateNestedManyWithoutToUsersInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutToUsersInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutToUsersInputSchema),z.lazy(() => MessageCreateWithoutToUsersInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutToUsersInputSchema),z.lazy(() => MessageUncheckedCreateWithoutToUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutToUsersInputSchema),z.lazy(() => MessageCreateOrConnectWithoutToUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MessageCreateNestedManyWithoutToUsersInputSchema;
