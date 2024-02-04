import { z } from 'zod';

export const TaskStatusSchema = z.enum(['wait','on','pause','cancelled','finished']);

export type TaskStatusType = `${z.infer<typeof TaskStatusSchema>}`

export default TaskStatusSchema;
