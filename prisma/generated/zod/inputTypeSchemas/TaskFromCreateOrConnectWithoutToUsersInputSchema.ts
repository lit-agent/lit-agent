import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromCreateWithoutToUsersInputSchema } from './TaskFromCreateWithoutToUsersInputSchema';
import { TaskFromUncheckedCreateWithoutToUsersInputSchema } from './TaskFromUncheckedCreateWithoutToUsersInputSchema';

export const TaskFromCreateOrConnectWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromCreateOrConnectWithoutToUsersInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutToUsersInputSchema) ]),
}).strict();

export default TaskFromCreateOrConnectWithoutToUsersInputSchema;
