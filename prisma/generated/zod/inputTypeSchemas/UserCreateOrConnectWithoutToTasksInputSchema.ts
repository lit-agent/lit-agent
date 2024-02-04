import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutToTasksInputSchema } from './UserCreateWithoutToTasksInputSchema';
import { UserUncheckedCreateWithoutToTasksInputSchema } from './UserUncheckedCreateWithoutToTasksInputSchema';

export const UserCreateOrConnectWithoutToTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutToTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutToTasksInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutToTasksInputSchema;
