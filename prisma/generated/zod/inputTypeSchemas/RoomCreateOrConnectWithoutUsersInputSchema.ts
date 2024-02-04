import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomWhereUniqueInputSchema } from './RoomWhereUniqueInputSchema';
import { RoomCreateWithoutUsersInputSchema } from './RoomCreateWithoutUsersInputSchema';
import { RoomUncheckedCreateWithoutUsersInputSchema } from './RoomUncheckedCreateWithoutUsersInputSchema';

export const RoomCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export default RoomCreateOrConnectWithoutUsersInputSchema;
