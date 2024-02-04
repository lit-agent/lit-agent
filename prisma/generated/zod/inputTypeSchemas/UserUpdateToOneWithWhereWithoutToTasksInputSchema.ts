import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutToTasksInputSchema } from './UserUpdateWithoutToTasksInputSchema';
import { UserUncheckedUpdateWithoutToTasksInputSchema } from './UserUncheckedUpdateWithoutToTasksInputSchema';

export const UserUpdateToOneWithWhereWithoutToTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutToTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToTasksInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutToTasksInputSchema;
