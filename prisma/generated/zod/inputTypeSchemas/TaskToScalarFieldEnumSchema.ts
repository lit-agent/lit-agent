import { z } from 'zod';

export const TaskToScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','taskId','status']);

export default TaskToScalarFieldEnumSchema;
