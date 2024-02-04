import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskFromCountOutputTypeSelectSchema } from './TaskFromCountOutputTypeSelectSchema';

export const TaskFromCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskFromCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskFromCountOutputTypeSelectSchema).nullish(),
}).strict();

export default TaskFromCountOutputTypeSelectSchema;
