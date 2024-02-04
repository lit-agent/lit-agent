import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutFromTasksInputSchema } from './UserCreateWithoutFromTasksInputSchema';
import { UserUncheckedCreateWithoutFromTasksInputSchema } from './UserUncheckedCreateWithoutFromTasksInputSchema';

export const UserCreateOrConnectWithoutFromTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFromTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromTasksInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutFromTasksInputSchema;
