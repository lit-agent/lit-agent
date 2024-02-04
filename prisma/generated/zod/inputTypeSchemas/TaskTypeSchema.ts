import { z } from 'zod';

export const TaskTypeSchema = z.enum(['broadcast','textChoices','imageChoices']);

export type TaskTypeType = `${z.infer<typeof TaskTypeSchema>}`

export default TaskTypeSchema;
