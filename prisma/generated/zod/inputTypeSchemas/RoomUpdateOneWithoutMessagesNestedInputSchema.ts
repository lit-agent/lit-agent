import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomCreateWithoutMessagesInputSchema } from './RoomCreateWithoutMessagesInputSchema';
import { RoomUncheckedCreateWithoutMessagesInputSchema } from './RoomUncheckedCreateWithoutMessagesInputSchema';
import { RoomCreateOrConnectWithoutMessagesInputSchema } from './RoomCreateOrConnectWithoutMessagesInputSchema';
import { RoomUpsertWithoutMessagesInputSchema } from './RoomUpsertWithoutMessagesInputSchema';
import { RoomWhereInputSchema } from './RoomWhereInputSchema';
import { RoomWhereUniqueInputSchema } from './RoomWhereUniqueInputSchema';
import { RoomUpdateToOneWithWhereWithoutMessagesInputSchema } from './RoomUpdateToOneWithWhereWithoutMessagesInputSchema';
import { RoomUpdateWithoutMessagesInputSchema } from './RoomUpdateWithoutMessagesInputSchema';
import { RoomUncheckedUpdateWithoutMessagesInputSchema } from './RoomUncheckedUpdateWithoutMessagesInputSchema';

export const RoomUpdateOneWithoutMessagesNestedInputSchema: z.ZodType<Prisma.RoomUpdateOneWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => RoomUpsertWithoutMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RoomWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RoomWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoomUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => RoomUpdateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export default RoomUpdateOneWithoutMessagesNestedInputSchema;
