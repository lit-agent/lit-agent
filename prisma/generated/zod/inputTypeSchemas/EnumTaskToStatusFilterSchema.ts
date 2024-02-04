import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';
import { NestedEnumTaskToStatusFilterSchema } from './NestedEnumTaskToStatusFilterSchema';

export const EnumTaskToStatusFilterSchema: z.ZodType<Prisma.EnumTaskToStatusFilter> = z.object({
  equals: z.lazy(() => TaskToStatusSchema).optional(),
  in: z.lazy(() => TaskToStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskToStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => NestedEnumTaskToStatusFilterSchema) ]).optional(),
}).strict();

export default EnumTaskToStatusFilterSchema;
