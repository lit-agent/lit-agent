import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceWhereUniqueInputSchema } from './TaskChoiceWhereUniqueInputSchema';
import { TaskChoiceCreateWithoutUsersInputSchema } from './TaskChoiceCreateWithoutUsersInputSchema';
import { TaskChoiceUncheckedCreateWithoutUsersInputSchema } from './TaskChoiceUncheckedCreateWithoutUsersInputSchema';

export const TaskChoiceCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.TaskChoiceCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => TaskChoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskChoiceCreateWithoutUsersInputSchema),z.lazy(() => TaskChoiceUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export default TaskChoiceCreateOrConnectWithoutUsersInputSchema;
