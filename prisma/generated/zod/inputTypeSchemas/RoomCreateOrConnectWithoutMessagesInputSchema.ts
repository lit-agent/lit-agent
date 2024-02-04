import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomWhereUniqueInputSchema } from './RoomWhereUniqueInputSchema';
import { RoomCreateWithoutMessagesInputSchema } from './RoomCreateWithoutMessagesInputSchema';
import { RoomUncheckedCreateWithoutMessagesInputSchema } from './RoomUncheckedCreateWithoutMessagesInputSchema';

export const RoomCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export default RoomCreateOrConnectWithoutMessagesInputSchema;
