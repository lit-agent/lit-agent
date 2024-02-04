import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskTypeSchema } from './TaskTypeSchema';
import { TaskStatusSchema } from './TaskStatusSchema';
import { TaskToUncheckedCreateNestedManyWithoutTaskInputSchema } from './TaskToUncheckedCreateNestedManyWithoutTaskInputSchema';
import { MessageUncheckedCreateNestedManyWithoutTaskInputSchema } from './MessageUncheckedCreateNestedManyWithoutTaskInputSchema';
import { TaskChoiceUncheckedCreateNestedManyWithoutTaskFromInputSchema } from './TaskChoiceUncheckedCreateNestedManyWithoutTaskFromInputSchema';

export const TaskFromUncheckedCreateInputSchema: z.ZodType<Prisma.TaskFromUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  fromUserId: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  toUsers: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  choices: z.lazy(() => TaskChoiceUncheckedCreateNestedManyWithoutTaskFromInputSchema).optional()
}).strict();

export default TaskFromUncheckedCreateInputSchema;
