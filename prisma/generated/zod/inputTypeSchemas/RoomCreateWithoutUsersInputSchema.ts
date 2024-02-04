import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateNestedManyWithoutRoomInputSchema } from './MessageCreateNestedManyWithoutRoomInputSchema';

export const RoomCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export default RoomCreateWithoutUsersInputSchema;
