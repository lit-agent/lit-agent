import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromUpdateWithoutToUsersInputSchema } from './TaskFromUpdateWithoutToUsersInputSchema';
import { TaskFromUncheckedUpdateWithoutToUsersInputSchema } from './TaskFromUncheckedUpdateWithoutToUsersInputSchema';
import { TaskFromCreateWithoutToUsersInputSchema } from './TaskFromCreateWithoutToUsersInputSchema';
import { TaskFromUncheckedCreateWithoutToUsersInputSchema } from './TaskFromUncheckedCreateWithoutToUsersInputSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskFromUpsertWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromUpsertWithoutToUsersInput> = z.object({
  update: z.union([ z.lazy(() => TaskFromUpdateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutToUsersInputSchema) ]),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutToUsersInputSchema) ]),
  where: z.lazy(() => TaskFromWhereInputSchema).optional()
}).strict();

export default TaskFromUpsertWithoutToUsersInputSchema;
