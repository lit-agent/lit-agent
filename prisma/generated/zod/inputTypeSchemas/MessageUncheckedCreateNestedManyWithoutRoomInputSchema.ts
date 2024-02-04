import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateWithoutRoomInputSchema } from './MessageCreateWithoutRoomInputSchema';
import { MessageUncheckedCreateWithoutRoomInputSchema } from './MessageUncheckedCreateWithoutRoomInputSchema';
import { MessageCreateOrConnectWithoutRoomInputSchema } from './MessageCreateOrConnectWithoutRoomInputSchema';
import { MessageCreateManyRoomInputEnvelopeSchema } from './MessageCreateManyRoomInputEnvelopeSchema';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';

export const MessageUncheckedCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageCreateWithoutRoomInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MessageUncheckedCreateNestedManyWithoutRoomInputSchema;
