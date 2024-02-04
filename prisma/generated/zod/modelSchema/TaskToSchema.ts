import { z } from 'zod';
import { TaskToStatusSchema } from '../inputTypeSchemas/TaskToStatusSchema'

/////////////////////////////////////////
// TASK TO SCHEMA
/////////////////////////////////////////

export const TaskToSchema = z.object({
  status: TaskToStatusSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  taskId: z.string(),
})

export type TaskTo = z.infer<typeof TaskToSchema>

export default TaskToSchema;
