import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutRoomsInputSchema } from './UserCreateWithoutRoomsInputSchema';
import { UserUncheckedCreateWithoutRoomsInputSchema } from './UserUncheckedCreateWithoutRoomsInputSchema';
import { UserCreateOrConnectWithoutRoomsInputSchema } from './UserCreateOrConnectWithoutRoomsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedManyWithoutRoomsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoomsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserCreateWithoutRoomsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default UserCreateNestedManyWithoutRoomsInputSchema;
