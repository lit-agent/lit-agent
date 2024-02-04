import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedManyWithoutRoomsInputSchema } from './UserCreateNestedManyWithoutRoomsInputSchema';
import { MessageCreateNestedManyWithoutRoomInputSchema } from './MessageCreateNestedManyWithoutRoomInputSchema';

export const RoomCreateInputSchema: z.ZodType<Prisma.RoomCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoomsInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export default RoomCreateInputSchema;
