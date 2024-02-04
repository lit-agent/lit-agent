import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateWithoutToUsersInputSchema } from './TaskFromCreateWithoutToUsersInputSchema';
import { TaskFromUncheckedCreateWithoutToUsersInputSchema } from './TaskFromUncheckedCreateWithoutToUsersInputSchema';
import { TaskFromCreateOrConnectWithoutToUsersInputSchema } from './TaskFromCreateOrConnectWithoutToUsersInputSchema';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';

export const TaskFromCreateNestedOneWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromCreateNestedOneWithoutToUsersInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutToUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskFromCreateOrConnectWithoutToUsersInputSchema).optional(),
  connect: z.lazy(() => TaskFromWhereUniqueInputSchema).optional()
}).strict();

export default TaskFromCreateNestedOneWithoutToUsersInputSchema;
