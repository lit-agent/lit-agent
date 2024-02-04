import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutRoomsInputSchema } from './UserUpdateWithoutRoomsInputSchema';
import { UserUncheckedUpdateWithoutRoomsInputSchema } from './UserUncheckedUpdateWithoutRoomsInputSchema';

export const UserUpdateWithWhereUniqueWithoutRoomsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoomsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoomsInputSchema) ]),
}).strict();

export default UserUpdateWithWhereUniqueWithoutRoomsInputSchema;
