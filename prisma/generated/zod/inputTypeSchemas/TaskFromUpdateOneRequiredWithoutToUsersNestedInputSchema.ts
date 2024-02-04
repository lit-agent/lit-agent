import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateWithoutToUsersInputSchema } from './TaskFromCreateWithoutToUsersInputSchema';
import { TaskFromUncheckedCreateWithoutToUsersInputSchema } from './TaskFromUncheckedCreateWithoutToUsersInputSchema';
import { TaskFromCreateOrConnectWithoutToUsersInputSchema } from './TaskFromCreateOrConnectWithoutToUsersInputSchema';
import { TaskFromUpsertWithoutToUsersInputSchema } from './TaskFromUpsertWithoutToUsersInputSchema';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromUpdateToOneWithWhereWithoutToUsersInputSchema } from './TaskFromUpdateToOneWithWhereWithoutToUsersInputSchema';
import { TaskFromUpdateWithoutToUsersInputSchema } from './TaskFromUpdateWithoutToUsersInputSchema';
import { TaskFromUncheckedUpdateWithoutToUsersInputSchema } from './TaskFromUncheckedUpdateWithoutToUsersInputSchema';

export const TaskFromUpdateOneRequiredWithoutToUsersNestedInputSchema: z.ZodType<Prisma.TaskFromUpdateOneRequiredWithoutToUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutToUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskFromCreateOrConnectWithoutToUsersInputSchema).optional(),
  upsert: z.lazy(() => TaskFromUpsertWithoutToUsersInputSchema).optional(),
  connect: z.lazy(() => TaskFromWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskFromUpdateToOneWithWhereWithoutToUsersInputSchema),z.lazy(() => TaskFromUpdateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutToUsersInputSchema) ]).optional(),
}).strict();

export default TaskFromUpdateOneRequiredWithoutToUsersNestedInputSchema;
