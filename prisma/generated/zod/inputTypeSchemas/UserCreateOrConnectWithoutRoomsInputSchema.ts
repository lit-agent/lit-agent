import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutRoomsInputSchema } from './UserCreateWithoutRoomsInputSchema';
import { UserUncheckedCreateWithoutRoomsInputSchema } from './UserUncheckedCreateWithoutRoomsInputSchema';

export const UserCreateOrConnectWithoutRoomsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoomsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutRoomsInputSchema;
