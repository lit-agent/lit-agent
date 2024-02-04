import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumTaskToStatusFilterSchema } from './EnumTaskToStatusFilterSchema';
import { TaskToStatusSchema } from './TaskToStatusSchema';

export const TaskToScalarWhereInputSchema: z.ZodType<Prisma.TaskToScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskToScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskToStatusFilterSchema),z.lazy(() => TaskToStatusSchema) ]).optional(),
}).strict();

export default TaskToScalarWhereInputSchema;
