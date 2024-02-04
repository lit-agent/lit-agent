import { z } from 'zod';

export const TaskChoiceScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','type','content','taskFromId']);

export default TaskChoiceScalarFieldEnumSchema;
