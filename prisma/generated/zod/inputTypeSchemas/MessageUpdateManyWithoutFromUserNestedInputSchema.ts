import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateWithoutFromUserInputSchema } from './MessageCreateWithoutFromUserInputSchema';
import { MessageUncheckedCreateWithoutFromUserInputSchema } from './MessageUncheckedCreateWithoutFromUserInputSchema';
import { MessageCreateOrConnectWithoutFromUserInputSchema } from './MessageCreateOrConnectWithoutFromUserInputSchema';
import { MessageUpsertWithWhereUniqueWithoutFromUserInputSchema } from './MessageUpsertWithWhereUniqueWithoutFromUserInputSchema';
import { MessageCreateManyFromUserInputEnvelopeSchema } from './MessageCreateManyFromUserInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithWhereUniqueWithoutFromUserInputSchema } from './MessageUpdateWithWhereUniqueWithoutFromUserInputSchema';
import { MessageUpdateManyWithWhereWithoutFromUserInputSchema } from './MessageUpdateManyWithWhereWithoutFromUserInputSchema';
import { MessageScalarWhereInputSchema } from './MessageScalarWhereInputSchema';

export const MessageUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutFromUserInputSchema),z.lazy(() => MessageCreateWithoutFromUserInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => MessageCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MessageUpdateManyWithoutFromUserNestedInputSchema;
