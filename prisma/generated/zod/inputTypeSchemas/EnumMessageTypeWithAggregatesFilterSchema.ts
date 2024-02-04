import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { NestedEnumMessageTypeWithAggregatesFilterSchema } from './NestedEnumMessageTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumMessageTypeFilterSchema } from './NestedEnumMessageTypeFilterSchema';

export const EnumMessageTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMessageTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MessageTypeSchema).optional(),
  in: z.lazy(() => MessageTypeSchema).array().optional(),
  notIn: z.lazy(() => MessageTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageTypeSchema),z.lazy(() => NestedEnumMessageTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMessageTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMessageTypeFilterSchema).optional()
}).strict();

export default EnumMessageTypeWithAggregatesFilterSchema;
