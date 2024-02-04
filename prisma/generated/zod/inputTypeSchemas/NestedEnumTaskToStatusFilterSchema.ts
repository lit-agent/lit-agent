import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';

export const NestedEnumTaskToStatusFilterSchema: z.ZodType<Prisma.NestedEnumTaskToStatusFilter> = z.object({
  equals: z.lazy(() => TaskToStatusSchema).optional(),
  in: z.lazy(() => TaskToStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskToStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => NestedEnumTaskToStatusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumTaskToStatusFilterSchema;
