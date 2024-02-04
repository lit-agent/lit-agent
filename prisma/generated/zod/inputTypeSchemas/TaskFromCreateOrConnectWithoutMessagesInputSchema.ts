import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromCreateWithoutMessagesInputSchema } from './TaskFromCreateWithoutMessagesInputSchema';
import { TaskFromUncheckedCreateWithoutMessagesInputSchema } from './TaskFromUncheckedCreateWithoutMessagesInputSchema';

export const TaskFromCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.TaskFromCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutMessagesInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export default TaskFromCreateOrConnectWithoutMessagesInputSchema;
