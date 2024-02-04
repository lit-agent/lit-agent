import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutToTasksInputSchema } from './UserCreateWithoutToTasksInputSchema';
import { UserUncheckedCreateWithoutToTasksInputSchema } from './UserUncheckedCreateWithoutToTasksInputSchema';
import { UserCreateOrConnectWithoutToTasksInputSchema } from './UserCreateOrConnectWithoutToTasksInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutToTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutToTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutToTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutToTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutToTasksInputSchema;
