import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceCountOutputTypeSelectSchema } from './TaskChoiceCountOutputTypeSelectSchema';

export const TaskChoiceCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskChoiceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskChoiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export default TaskChoiceCountOutputTypeSelectSchema;
