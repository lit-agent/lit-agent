import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { NestedEnumTaskChoiceTypeFilterSchema } from './NestedEnumTaskChoiceTypeFilterSchema';

export const EnumTaskChoiceTypeFilterSchema: z.ZodType<Prisma.EnumTaskChoiceTypeFilter> = z.object({
  equals: z.lazy(() => TaskChoiceTypeSchema).optional(),
  in: z.lazy(() => TaskChoiceTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskChoiceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskChoiceTypeSchema),z.lazy(() => NestedEnumTaskChoiceTypeFilterSchema) ]).optional(),
}).strict();

export default EnumTaskChoiceTypeFilterSchema;
