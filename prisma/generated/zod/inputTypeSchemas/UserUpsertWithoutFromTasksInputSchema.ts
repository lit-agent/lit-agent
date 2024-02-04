import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutFromTasksInputSchema } from './UserUpdateWithoutFromTasksInputSchema';
import { UserUncheckedUpdateWithoutFromTasksInputSchema } from './UserUncheckedUpdateWithoutFromTasksInputSchema';
import { UserCreateWithoutFromTasksInputSchema } from './UserCreateWithoutFromTasksInputSchema';
import { UserUncheckedCreateWithoutFromTasksInputSchema } from './UserUncheckedCreateWithoutFromTasksInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutFromTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutFromTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutFromTasksInputSchema;
