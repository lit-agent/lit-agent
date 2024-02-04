import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceCreateWithoutUsersInputSchema } from './TaskChoiceCreateWithoutUsersInputSchema';
import { TaskChoiceUncheckedCreateWithoutUsersInputSchema } from './TaskChoiceUncheckedCreateWithoutUsersInputSchema';
import { TaskChoiceCreateOrConnectWithoutUsersInputSchema } from './TaskChoiceCreateOrConnectWithoutUsersInputSchema';
import { TaskChoiceUpsertWithoutUsersInputSchema } from './TaskChoiceUpsertWithoutUsersInputSchema';
import { TaskChoiceWhereInputSchema } from './TaskChoiceWhereInputSchema';
import { TaskChoiceWhereUniqueInputSchema } from './TaskChoiceWhereUniqueInputSchema';
import { TaskChoiceUpdateToOneWithWhereWithoutUsersInputSchema } from './TaskChoiceUpdateToOneWithWhereWithoutUsersInputSchema';
import { TaskChoiceUpdateWithoutUsersInputSchema } from './TaskChoiceUpdateWithoutUsersInputSchema';
import { TaskChoiceUncheckedUpdateWithoutUsersInputSchema } from './TaskChoiceUncheckedUpdateWithoutUsersInputSchema';

export const TaskChoiceUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.TaskChoiceUpdateOneWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskChoiceCreateWithoutUsersInputSchema),z.lazy(() => TaskChoiceUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskChoiceCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => TaskChoiceUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TaskChoiceWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TaskChoiceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TaskChoiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskChoiceUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => TaskChoiceUpdateWithoutUsersInputSchema),z.lazy(() => TaskChoiceUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export default TaskChoiceUpdateOneWithoutUsersNestedInputSchema;
