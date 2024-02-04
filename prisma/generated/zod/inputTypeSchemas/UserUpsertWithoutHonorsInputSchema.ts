import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutHonorsInputSchema } from './UserUpdateWithoutHonorsInputSchema';
import { UserUncheckedUpdateWithoutHonorsInputSchema } from './UserUncheckedUpdateWithoutHonorsInputSchema';
import { UserCreateWithoutHonorsInputSchema } from './UserCreateWithoutHonorsInputSchema';
import { UserUncheckedCreateWithoutHonorsInputSchema } from './UserUncheckedCreateWithoutHonorsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutHonorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutHonorsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHonorsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHonorsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutHonorsInputSchema;
