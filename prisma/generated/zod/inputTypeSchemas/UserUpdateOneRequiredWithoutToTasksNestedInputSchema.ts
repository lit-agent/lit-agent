import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutToTasksInputSchema } from './UserCreateWithoutToTasksInputSchema';
import { UserUncheckedCreateWithoutToTasksInputSchema } from './UserUncheckedCreateWithoutToTasksInputSchema';
import { UserCreateOrConnectWithoutToTasksInputSchema } from './UserCreateOrConnectWithoutToTasksInputSchema';
import { UserUpsertWithoutToTasksInputSchema } from './UserUpsertWithoutToTasksInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutToTasksInputSchema } from './UserUpdateToOneWithWhereWithoutToTasksInputSchema';
import { UserUpdateWithoutToTasksInputSchema } from './UserUpdateWithoutToTasksInputSchema';
import { UserUncheckedUpdateWithoutToTasksInputSchema } from './UserUncheckedUpdateWithoutToTasksInputSchema';

export const UserUpdateOneRequiredWithoutToTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutToTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutToTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutToTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutToTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutToTasksInputSchema),z.lazy(() => UserUpdateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToTasksInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutToTasksNestedInputSchema;
