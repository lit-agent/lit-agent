import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { UserCreateNestedManyWithoutTaskChoiceInputSchema } from './UserCreateNestedManyWithoutTaskChoiceInputSchema';
import { TaskFromCreateNestedOneWithoutChoicesInputSchema } from './TaskFromCreateNestedOneWithoutChoicesInputSchema';

export const TaskChoiceCreateInputSchema: z.ZodType<Prisma.TaskChoiceCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskChoiceTypeSchema),
  content: z.string(),
  users: z.lazy(() => UserCreateNestedManyWithoutTaskChoiceInputSchema).optional(),
  TaskFrom: z.lazy(() => TaskFromCreateNestedOneWithoutChoicesInputSchema).optional()
}).strict();

export default TaskChoiceCreateInputSchema;
