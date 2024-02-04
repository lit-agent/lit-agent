import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutRoomsInputSchema } from './UserCreateWithoutRoomsInputSchema';
import { UserUncheckedCreateWithoutRoomsInputSchema } from './UserUncheckedCreateWithoutRoomsInputSchema';
import { UserCreateOrConnectWithoutRoomsInputSchema } from './UserCreateOrConnectWithoutRoomsInputSchema';
import { UserUpsertWithWhereUniqueWithoutRoomsInputSchema } from './UserUpsertWithWhereUniqueWithoutRoomsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithWhereUniqueWithoutRoomsInputSchema } from './UserUpdateWithWhereUniqueWithoutRoomsInputSchema';
import { UserUpdateManyWithWhereWithoutRoomsInputSchema } from './UserUpdateManyWithWhereWithoutRoomsInputSchema';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';

export const UserUpdateManyWithoutRoomsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRoomsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserCreateWithoutRoomsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoomsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoomsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default UserUpdateManyWithoutRoomsNestedInputSchema;
