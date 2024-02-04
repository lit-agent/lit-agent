import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { EnumTaskChoiceTypeWithAggregatesFilterSchema } from './EnumTaskChoiceTypeWithAggregatesFilterSchema';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const TaskChoiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskChoiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskChoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskChoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskChoiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskChoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskChoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskChoiceTypeWithAggregatesFilterSchema),z.lazy(() => TaskChoiceTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskFromId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default TaskChoiceScalarWhereWithAggregatesInputSchema;
