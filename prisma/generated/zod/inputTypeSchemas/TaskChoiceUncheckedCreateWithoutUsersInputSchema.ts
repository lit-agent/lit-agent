import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';

export const TaskChoiceUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.TaskChoiceUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskChoiceTypeSchema),
  content: z.string(),
  taskFromId: z.string().optional().nullable()
}).strict();

export default TaskChoiceUncheckedCreateWithoutUsersInputSchema;
