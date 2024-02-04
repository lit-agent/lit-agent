import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TaskChoiceCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskChoiceCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
}).strict();

export default TaskChoiceCountOutputTypeSelectSchema;
