import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';
import { UserUpdateManyMutationInputSchema } from './UserUpdateManyMutationInputSchema';
import { UserUncheckedUpdateManyWithoutRoomsInputSchema } from './UserUncheckedUpdateManyWithoutRoomsInputSchema';

export const UserUpdateManyWithWhereWithoutRoomsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoomsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutRoomsInputSchema) ]),
}).strict();

export default UserUpdateManyWithWhereWithoutRoomsInputSchema;
