import { z } from 'zod';

export const TaskToStatusSchema = z.enum(['goon','finished','cancelled']);

export type TaskToStatusType = `${z.infer<typeof TaskToStatusSchema>}`

export default TaskToStatusSchema;
