import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUncheckedCreateNestedManyWithoutRoomsInputSchema } from './UserUncheckedCreateNestedManyWithoutRoomsInputSchema';

export const RoomUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoomsInputSchema).optional()
}).strict();

export default RoomUncheckedCreateWithoutMessagesInputSchema;
