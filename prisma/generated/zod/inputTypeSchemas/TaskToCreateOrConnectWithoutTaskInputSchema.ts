import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';
import { TaskToCreateWithoutTaskInputSchema } from './TaskToCreateWithoutTaskInputSchema';
import { TaskToUncheckedCreateWithoutTaskInputSchema } from './TaskToUncheckedCreateWithoutTaskInputSchema';

export const TaskToCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.TaskToCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export default TaskToCreateOrConnectWithoutTaskInputSchema;
