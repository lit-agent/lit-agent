import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceWhereInputSchema } from './TaskChoiceWhereInputSchema';
import { TaskChoiceUpdateWithoutUsersInputSchema } from './TaskChoiceUpdateWithoutUsersInputSchema';
import { TaskChoiceUncheckedUpdateWithoutUsersInputSchema } from './TaskChoiceUncheckedUpdateWithoutUsersInputSchema';

export const TaskChoiceUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.TaskChoiceUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => TaskChoiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskChoiceUpdateWithoutUsersInputSchema),z.lazy(() => TaskChoiceUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export default TaskChoiceUpdateToOneWithWhereWithoutUsersInputSchema;
