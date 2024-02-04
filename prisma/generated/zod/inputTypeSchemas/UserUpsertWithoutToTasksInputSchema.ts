import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutToTasksInputSchema } from './UserUpdateWithoutToTasksInputSchema';
import { UserUncheckedUpdateWithoutToTasksInputSchema } from './UserUncheckedUpdateWithoutToTasksInputSchema';
import { UserCreateWithoutToTasksInputSchema } from './UserCreateWithoutToTasksInputSchema';
import { UserUncheckedCreateWithoutToTasksInputSchema } from './UserUncheckedCreateWithoutToTasksInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutToTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutToTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutToTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutToTasksInputSchema;
