import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';
import { TaskToUpdateWithoutTaskInputSchema } from './TaskToUpdateWithoutTaskInputSchema';
import { TaskToUncheckedUpdateWithoutTaskInputSchema } from './TaskToUncheckedUpdateWithoutTaskInputSchema';

export const TaskToUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskToUpdateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export default TaskToUpdateWithWhereUniqueWithoutTaskInputSchema;
