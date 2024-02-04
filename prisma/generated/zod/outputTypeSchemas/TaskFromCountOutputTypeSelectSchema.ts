import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TaskFromCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskFromCountOutputTypeSelect> = z.object({
  toUsers: z.boolean().optional(),
  messages: z.boolean().optional(),
  choices: z.boolean().optional(),
}).strict();

export default TaskFromCountOutputTypeSelectSchema;
