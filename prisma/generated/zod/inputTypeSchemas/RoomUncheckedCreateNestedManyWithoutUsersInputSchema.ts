import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomCreateWithoutUsersInputSchema } from './RoomCreateWithoutUsersInputSchema';
import { RoomUncheckedCreateWithoutUsersInputSchema } from './RoomUncheckedCreateWithoutUsersInputSchema';
import { RoomCreateOrConnectWithoutUsersInputSchema } from './RoomCreateOrConnectWithoutUsersInputSchema';
import { RoomWhereUniqueInputSchema } from './RoomWhereUniqueInputSchema';

export const RoomUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomCreateWithoutUsersInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default RoomUncheckedCreateNestedManyWithoutUsersInputSchema;
