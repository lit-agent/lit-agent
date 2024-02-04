import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumTaskChoiceTypeFilterSchema } from './EnumTaskChoiceTypeFilterSchema';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const TaskChoiceScalarWhereInputSchema: z.ZodType<Prisma.TaskChoiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskChoiceScalarWhereInputSchema),z.lazy(() => TaskChoiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskChoiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskChoiceScalarWhereInputSchema),z.lazy(() => TaskChoiceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskChoiceTypeFilterSchema),z.lazy(() => TaskChoiceTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskFromId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default TaskChoiceScalarWhereInputSchema;
