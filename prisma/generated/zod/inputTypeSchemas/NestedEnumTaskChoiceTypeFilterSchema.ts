import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';

export const NestedEnumTaskChoiceTypeFilterSchema: z.ZodType<Prisma.NestedEnumTaskChoiceTypeFilter> = z.object({
  equals: z.lazy(() => TaskChoiceTypeSchema).optional(),
  in: z.lazy(() => TaskChoiceTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskChoiceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskChoiceTypeSchema),z.lazy(() => NestedEnumTaskChoiceTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumTaskChoiceTypeFilterSchema;
