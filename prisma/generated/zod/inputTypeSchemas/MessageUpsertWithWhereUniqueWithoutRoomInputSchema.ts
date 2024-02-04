import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereUniqueInputSchema } from './MessageWhereUniqueInputSchema';
import { MessageUpdateWithoutRoomInputSchema } from './MessageUpdateWithoutRoomInputSchema';
import { MessageUncheckedUpdateWithoutRoomInputSchema } from './MessageUncheckedUpdateWithoutRoomInputSchema';
import { MessageCreateWithoutRoomInputSchema } from './MessageCreateWithoutRoomInputSchema';
import { MessageUncheckedCreateWithoutRoomInputSchema } from './MessageUncheckedCreateWithoutRoomInputSchema';

export const MessageUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutRoomInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export default MessageUpsertWithWhereUniqueWithoutRoomInputSchema;
