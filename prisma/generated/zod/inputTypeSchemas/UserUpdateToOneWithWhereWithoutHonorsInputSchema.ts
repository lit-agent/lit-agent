import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutHonorsInputSchema } from './UserUpdateWithoutHonorsInputSchema';
import { UserUncheckedUpdateWithoutHonorsInputSchema } from './UserUncheckedUpdateWithoutHonorsInputSchema';

export const UserUpdateToOneWithWhereWithoutHonorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHonorsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHonorsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutHonorsInputSchema;
