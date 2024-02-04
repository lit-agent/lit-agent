import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToScalarWhereInputSchema } from './TaskToScalarWhereInputSchema';
import { TaskToUpdateManyMutationInputSchema } from './TaskToUpdateManyMutationInputSchema';
import { TaskToUncheckedUpdateManyWithoutTaskInputSchema } from './TaskToUncheckedUpdateManyWithoutTaskInputSchema';

export const TaskToUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskToScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskToUpdateManyMutationInputSchema),z.lazy(() => TaskToUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export default TaskToUpdateManyWithWhereWithoutTaskInputSchema;
