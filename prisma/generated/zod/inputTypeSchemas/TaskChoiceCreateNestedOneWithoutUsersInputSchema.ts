import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceCreateWithoutUsersInputSchema } from './TaskChoiceCreateWithoutUsersInputSchema';
import { TaskChoiceUncheckedCreateWithoutUsersInputSchema } from './TaskChoiceUncheckedCreateWithoutUsersInputSchema';
import { TaskChoiceCreateOrConnectWithoutUsersInputSchema } from './TaskChoiceCreateOrConnectWithoutUsersInputSchema';
import { TaskChoiceWhereUniqueInputSchema } from './TaskChoiceWhereUniqueInputSchema';

export const TaskChoiceCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.TaskChoiceCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => TaskChoiceCreateWithoutUsersInputSchema),z.lazy(() => TaskChoiceUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskChoiceCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => TaskChoiceWhereUniqueInputSchema).optional()
}).strict();

export default TaskChoiceCreateNestedOneWithoutUsersInputSchema;
