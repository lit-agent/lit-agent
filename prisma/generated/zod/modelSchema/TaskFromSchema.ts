import { z } from 'zod';
import { TaskTypeSchema } from '../inputTypeSchemas/TaskTypeSchema'
import { TaskStatusSchema } from '../inputTypeSchemas/TaskStatusSchema'

/////////////////////////////////////////
// TASK FROM SCHEMA
/////////////////////////////////////////

export const TaskFromSchema = z.object({
  type: TaskTypeSchema,
  status: TaskStatusSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  fromUserId: z.string(),
})

export type TaskFrom = z.infer<typeof TaskFromSchema>

export default TaskFromSchema;
