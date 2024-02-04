import { z } from 'zod';

export const TaskChoiceTypeSchema = z.enum(['Text','Image']);

export type TaskChoiceTypeType = `${z.infer<typeof TaskChoiceTypeSchema>}`

export default TaskChoiceTypeSchema;
