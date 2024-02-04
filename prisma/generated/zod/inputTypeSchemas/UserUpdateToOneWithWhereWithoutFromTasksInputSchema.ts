import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutFromTasksInputSchema } from './UserUpdateWithoutFromTasksInputSchema';
import { UserUncheckedUpdateWithoutFromTasksInputSchema } from './UserUncheckedUpdateWithoutFromTasksInputSchema';

export const UserUpdateToOneWithWhereWithoutFromTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFromTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromTasksInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutFromTasksInputSchema;
