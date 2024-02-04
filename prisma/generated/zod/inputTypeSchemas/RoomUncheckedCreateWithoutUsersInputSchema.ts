import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageUncheckedCreateNestedManyWithoutRoomInputSchema } from './MessageUncheckedCreateNestedManyWithoutRoomInputSchema';

export const RoomUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export default RoomUncheckedCreateWithoutUsersInputSchema;
