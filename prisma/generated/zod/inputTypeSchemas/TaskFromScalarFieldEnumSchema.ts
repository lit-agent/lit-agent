import { z } from 'zod';

export const TaskFromScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','title','type','content','value','startTime','endTime','fromUserId','status']);

export default TaskFromScalarFieldEnumSchema;
