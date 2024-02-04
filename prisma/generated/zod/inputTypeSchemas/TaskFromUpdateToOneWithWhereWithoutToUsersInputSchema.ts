import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';
import { TaskFromUpdateWithoutToUsersInputSchema } from './TaskFromUpdateWithoutToUsersInputSchema';
import { TaskFromUncheckedUpdateWithoutToUsersInputSchema } from './TaskFromUncheckedUpdateWithoutToUsersInputSchema';

export const TaskFromUpdateToOneWithWhereWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromUpdateToOneWithWhereWithoutToUsersInput> = z.object({
  where: z.lazy(() => TaskFromWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskFromUpdateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutToUsersInputSchema) ]),
}).strict();

export default TaskFromUpdateToOneWithWhereWithoutToUsersInputSchema;
