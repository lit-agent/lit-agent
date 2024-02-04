import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceSelectSchema } from '../inputTypeSchemas/TaskChoiceSelectSchema';
import { TaskChoiceIncludeSchema } from '../inputTypeSchemas/TaskChoiceIncludeSchema';

export const TaskChoiceArgsSchema: z.ZodType<Prisma.TaskChoiceDefaultArgs> = z.object({
  select: z.lazy(() => TaskChoiceSelectSchema).optional(),
  include: z.lazy(() => TaskChoiceIncludeSchema).optional(),
}).strict();

export default TaskChoiceArgsSchema;
