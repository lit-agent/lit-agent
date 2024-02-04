import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedManyWithoutRoomsInputSchema } from './UserCreateNestedManyWithoutRoomsInputSchema';

export const RoomCreateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoomsInputSchema).optional()
}).strict();

export default RoomCreateWithoutMessagesInputSchema;
