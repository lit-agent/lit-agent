import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromUpdateWithoutMessagesInputSchema } from './TaskFromUpdateWithoutMessagesInputSchema';
import { TaskFromUncheckedUpdateWithoutMessagesInputSchema } from './TaskFromUncheckedUpdateWithoutMessagesInputSchema';
import { TaskFromCreateWithoutMessagesInputSchema } from './TaskFromCreateWithoutMessagesInputSchema';
import { TaskFromUncheckedCreateWithoutMessagesInputSchema } from './TaskFromUncheckedCreateWithoutMessagesInputSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskFromUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.TaskFromUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => TaskFromUpdateWithoutMessagesInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutMessagesInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => TaskFromWhereInputSchema).optional()
}).strict();

export default TaskFromUpsertWithoutMessagesInputSchema;
