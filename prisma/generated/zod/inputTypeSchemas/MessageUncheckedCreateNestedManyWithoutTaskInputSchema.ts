import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateWithoutTaskInputSchema } from './MessageCreateWithoutTaskInputSchema';
import { MessageUncheckedCreateWithoutTaskInputSchema } from './MessageUncheckedCreateWithoutTaskInputSchema';
import { MessageCreateOrConnectWithoutTaskInputSchema } from './MessageCreateOrConnectWithoutTaskInputSchema';
import { MessageCreateManyTaskInputEnvelopeSchema } from './MessageCreateManyTaskInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';

export const MessageUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutTaskInputSchema),z.lazy(() => MessageCreateWithoutTaskInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutTaskInputSchema),z.lazy(() => MessageUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutTaskInputSchema),z.lazy(() => MessageCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MessageUncheckedCreateNestedManyWithoutTaskInputSchema;
