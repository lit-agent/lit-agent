import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskTypeSchema } from './TaskTypeSchema';
import { TaskStatusSchema } from './TaskStatusSchema';
import { TaskToCreateNestedManyWithoutTaskInputSchema } from './TaskToCreateNestedManyWithoutTaskInputSchema';
import { MessageCreateNestedManyWithoutTaskInputSchema } from './MessageCreateNestedManyWithoutTaskInputSchema';
import { TaskChoiceCreateNestedManyWithoutTaskFromInputSchema } from './TaskChoiceCreateNestedManyWithoutTaskFromInputSchema';

export const TaskFromCreateWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  status: z.lazy(() => TaskStatusSchema),
  toUsers: z.lazy(() => TaskToCreateNestedManyWithoutTaskInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutTaskInputSchema).optional(),
  choices: z.lazy(() => TaskChoiceCreateNestedManyWithoutTaskFromInputSchema).optional()
}).strict();

export default TaskFromCreateWithoutFromUserInputSchema;
