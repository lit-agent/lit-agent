import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomWhereInputSchema } from './RoomWhereInputSchema';
import { RoomUpdateWithoutMessagesInputSchema } from './RoomUpdateWithoutMessagesInputSchema';
import { RoomUncheckedUpdateWithoutMessagesInputSchema } from './RoomUncheckedUpdateWithoutMessagesInputSchema';

export const RoomUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => RoomWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoomUpdateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export default RoomUpdateToOneWithWhereWithoutMessagesInputSchema;
