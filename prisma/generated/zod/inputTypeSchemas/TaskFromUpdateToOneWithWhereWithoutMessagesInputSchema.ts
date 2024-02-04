import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';
import { TaskFromUpdateWithoutMessagesInputSchema } from './TaskFromUpdateWithoutMessagesInputSchema';
import { TaskFromUncheckedUpdateWithoutMessagesInputSchema } from './TaskFromUncheckedUpdateWithoutMessagesInputSchema';

export const TaskFromUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.TaskFromUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => TaskFromWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskFromUpdateWithoutMessagesInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export default TaskFromUpdateToOneWithWhereWithoutMessagesInputSchema;
