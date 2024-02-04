import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomCreateWithoutMessagesInputSchema } from './RoomCreateWithoutMessagesInputSchema';
import { RoomUncheckedCreateWithoutMessagesInputSchema } from './RoomUncheckedCreateWithoutMessagesInputSchema';
import { RoomCreateOrConnectWithoutMessagesInputSchema } from './RoomCreateOrConnectWithoutMessagesInputSchema';
import { RoomWhereUniqueInputSchema } from './RoomWhereUniqueInputSchema';

export const RoomCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.RoomCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional()
}).strict();

export default RoomCreateNestedOneWithoutMessagesInputSchema;
