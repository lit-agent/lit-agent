import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';
import { TaskToCreateWithoutUserInputSchema } from './TaskToCreateWithoutUserInputSchema';
import { TaskToUncheckedCreateWithoutUserInputSchema } from './TaskToUncheckedCreateWithoutUserInputSchema';

export const TaskToCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TaskToCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default TaskToCreateOrConnectWithoutUserInputSchema;
