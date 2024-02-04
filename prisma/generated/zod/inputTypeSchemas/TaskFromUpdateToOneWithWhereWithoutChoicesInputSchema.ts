import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';
import { TaskFromUpdateWithoutChoicesInputSchema } from './TaskFromUpdateWithoutChoicesInputSchema';
import { TaskFromUncheckedUpdateWithoutChoicesInputSchema } from './TaskFromUncheckedUpdateWithoutChoicesInputSchema';

export const TaskFromUpdateToOneWithWhereWithoutChoicesInputSchema: z.ZodType<Prisma.TaskFromUpdateToOneWithWhereWithoutChoicesInput> = z.object({
  where: z.lazy(() => TaskFromWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskFromUpdateWithoutChoicesInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutChoicesInputSchema) ]),
}).strict();

export default TaskFromUpdateToOneWithWhereWithoutChoicesInputSchema;
