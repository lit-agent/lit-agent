import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateWithoutToUsersInputSchema } from './MessageCreateWithoutToUsersInputSchema';
import { MessageUncheckedCreateWithoutToUsersInputSchema } from './MessageUncheckedCreateWithoutToUsersInputSchema';
import { MessageCreateOrConnectWithoutToUsersInputSchema } from './MessageCreateOrConnectWithoutToUsersInputSchema';
import { MessageUpsertWithWhereUniqueWithoutToUsersInputSchema } from './MessageUpsertWithWhereUniqueWithoutToUsersInputSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithWhereUniqueWithoutToUsersInputSchema } from './MessageUpdateWithWhereUniqueWithoutToUsersInputSchema';
import { MessageUpdateManyWithWhereWithoutToUsersInputSchema } from './MessageUpdateManyWithWhereWithoutToUsersInputSchema';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';

export const MessageUpdateManyWithoutToUsersNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutToUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutToUsersInputSchema),z.lazy(() => MessageCreateWithoutToUsersInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutToUsersInputSchema),z.lazy(() => MessageUncheckedCreateWithoutToUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutToUsersInputSchema),z.lazy(() => MessageCreateOrConnectWithoutToUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutToUsersInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutToUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutToUsersInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutToUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutToUsersInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutToUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MessageUpdateManyWithoutToUsersNestedInputSchema;
