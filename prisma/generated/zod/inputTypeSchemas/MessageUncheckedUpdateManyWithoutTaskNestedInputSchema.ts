import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateWithoutTaskInputSchema } from './MessageCreateWithoutTaskInputSchema';
import { MessageUncheckedCreateWithoutTaskInputSchema } from './MessageUncheckedCreateWithoutTaskInputSchema';
import { MessageCreateOrConnectWithoutTaskInputSchema } from './MessageCreateOrConnectWithoutTaskInputSchema';
import { MessageUpsertWithWhereUniqueWithoutTaskInputSchema } from './MessageUpsertWithWhereUniqueWithoutTaskInputSchema';
import { MessageCreateManyTaskInputEnvelopeSchema } from './MessageCreateManyTaskInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithWhereUniqueWithoutTaskInputSchema } from './MessageUpdateWithWhereUniqueWithoutTaskInputSchema';
import { MessageUpdateManyWithWhereWithoutTaskInputSchema } from './MessageUpdateManyWithWhereWithoutTaskInputSchema';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';

export const MessageUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutTaskInputSchema),z.lazy(() => MessageCreateWithoutTaskInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutTaskInputSchema),z.lazy(() => MessageUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutTaskInputSchema),z.lazy(() => MessageCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MessageUncheckedUpdateManyWithoutTaskNestedInputSchema;
