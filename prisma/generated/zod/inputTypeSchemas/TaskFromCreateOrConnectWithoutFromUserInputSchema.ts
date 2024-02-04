import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromCreateWithoutFromUserInputSchema } from './TaskFromCreateWithoutFromUserInputSchema';
import { TaskFromUncheckedCreateWithoutFromUserInputSchema } from './TaskFromUncheckedCreateWithoutFromUserInputSchema';

export const TaskFromCreateOrConnectWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromCreateOrConnectWithoutFromUserInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export default TaskFromCreateOrConnectWithoutFromUserInputSchema;
