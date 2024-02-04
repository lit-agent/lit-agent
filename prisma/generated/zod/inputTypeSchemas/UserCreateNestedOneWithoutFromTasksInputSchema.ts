import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutFromTasksInputSchema } from './UserCreateWithoutFromTasksInputSchema';
import { UserUncheckedCreateWithoutFromTasksInputSchema } from './UserUncheckedCreateWithoutFromTasksInputSchema';
import { UserCreateOrConnectWithoutFromTasksInputSchema } from './UserCreateOrConnectWithoutFromTasksInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutFromTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFromTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFromTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutFromTasksInputSchema;
