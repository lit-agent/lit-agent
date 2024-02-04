import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomUpdateWithoutMessagesInputSchema } from './RoomUpdateWithoutMessagesInputSchema';
import { RoomUncheckedUpdateWithoutMessagesInputSchema } from './RoomUncheckedUpdateWithoutMessagesInputSchema';
import { RoomCreateWithoutMessagesInputSchema } from './RoomCreateWithoutMessagesInputSchema';
import { RoomUncheckedCreateWithoutMessagesInputSchema } from './RoomUncheckedCreateWithoutMessagesInputSchema';
import { RoomWhereInputSchema } from './RoomWhereInputSchema';

export const RoomUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => RoomUpdateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => RoomWhereInputSchema).optional()
}).strict();

export default RoomUpsertWithoutMessagesInputSchema;
