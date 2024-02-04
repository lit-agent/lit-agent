import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUncheckedCreateNestedManyWithoutRoomsInputSchema } from './UserUncheckedCreateNestedManyWithoutRoomsInputSchema';
import { MessageUncheckedCreateNestedManyWithoutRoomInputSchema } from './MessageUncheckedCreateNestedManyWithoutRoomInputSchema';

export const RoomUncheckedCreateInputSchema: z.ZodType<Prisma.RoomUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoomsInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export default RoomUncheckedCreateInputSchema;
