import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceUpdateWithoutUsersInputSchema } from './TaskChoiceUpdateWithoutUsersInputSchema';
import { TaskChoiceUncheckedUpdateWithoutUsersInputSchema } from './TaskChoiceUncheckedUpdateWithoutUsersInputSchema';
import { TaskChoiceCreateWithoutUsersInputSchema } from './TaskChoiceCreateWithoutUsersInputSchema';
import { TaskChoiceUncheckedCreateWithoutUsersInputSchema } from './TaskChoiceUncheckedCreateWithoutUsersInputSchema';
import { TaskChoiceWhereInputSchema } from './TaskChoiceWhereInputSchema';

export const TaskChoiceUpsertWithoutUsersInputSchema: z.ZodType<Prisma.TaskChoiceUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => TaskChoiceUpdateWithoutUsersInputSchema),z.lazy(() => TaskChoiceUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => TaskChoiceCreateWithoutUsersInputSchema),z.lazy(() => TaskChoiceUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => TaskChoiceWhereInputSchema).optional()
}).strict();

export default TaskChoiceUpsertWithoutUsersInputSchema;
