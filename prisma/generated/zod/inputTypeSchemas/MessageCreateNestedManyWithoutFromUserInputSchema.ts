import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateWithoutFromUserInputSchema } from './MessageCreateWithoutFromUserInputSchema';
import { MessageUncheckedCreateWithoutFromUserInputSchema } from './MessageUncheckedCreateWithoutFromUserInputSchema';
import { MessageCreateOrConnectWithoutFromUserInputSchema } from './MessageCreateOrConnectWithoutFromUserInputSchema';
import { MessageCreateManyFromUserInputEnvelopeSchema } from './MessageCreateManyFromUserInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';

export const MessageCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutFromUserInputSchema),z.lazy(() => MessageCreateWithoutFromUserInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => MessageUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => MessageCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MessageCreateNestedManyWithoutFromUserInputSchema;
