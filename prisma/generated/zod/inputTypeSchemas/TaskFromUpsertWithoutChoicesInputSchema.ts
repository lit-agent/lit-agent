import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromUpdateWithoutChoicesInputSchema } from './TaskFromUpdateWithoutChoicesInputSchema';
import { TaskFromUncheckedUpdateWithoutChoicesInputSchema } from './TaskFromUncheckedUpdateWithoutChoicesInputSchema';
import { TaskFromCreateWithoutChoicesInputSchema } from './TaskFromCreateWithoutChoicesInputSchema';
import { TaskFromUncheckedCreateWithoutChoicesInputSchema } from './TaskFromUncheckedCreateWithoutChoicesInputSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskFromUpsertWithoutChoicesInputSchema: z.ZodType<Prisma.TaskFromUpsertWithoutChoicesInput> = z.object({
  update: z.union([ z.lazy(() => TaskFromUpdateWithoutChoicesInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutChoicesInputSchema) ]),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutChoicesInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutChoicesInputSchema) ]),
  where: z.lazy(() => TaskFromWhereInputSchema).optional()
}).strict();

export default TaskFromUpsertWithoutChoicesInputSchema;
