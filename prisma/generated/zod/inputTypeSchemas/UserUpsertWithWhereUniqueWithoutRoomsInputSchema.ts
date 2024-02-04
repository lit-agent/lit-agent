import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutRoomsInputSchema } from './UserUpdateWithoutRoomsInputSchema';
import { UserUncheckedUpdateWithoutRoomsInputSchema } from './UserUncheckedUpdateWithoutRoomsInputSchema';
import { UserCreateWithoutRoomsInputSchema } from './UserCreateWithoutRoomsInputSchema';
import { UserUncheckedCreateWithoutRoomsInputSchema } from './UserUncheckedCreateWithoutRoomsInputSchema';

export const UserUpsertWithWhereUniqueWithoutRoomsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoomsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoomsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema) ]),
}).strict();

export default UserUpsertWithWhereUniqueWithoutRoomsInputSchema;
