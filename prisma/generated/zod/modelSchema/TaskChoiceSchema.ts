import { z } from 'zod';
import { TaskChoiceTypeSchema } from '../inputTypeSchemas/TaskChoiceTypeSchema'

/////////////////////////////////////////
// TASK CHOICE SCHEMA
/////////////////////////////////////////

export const TaskChoiceSchema = z.object({
  type: TaskChoiceTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  content: z.string(),
  taskFromId: z.string().nullable(),
})

export type TaskChoice = z.infer<typeof TaskChoiceSchema>

export default TaskChoiceSchema;
