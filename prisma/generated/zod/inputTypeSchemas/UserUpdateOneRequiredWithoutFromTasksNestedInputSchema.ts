import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutFromTasksInputSchema } from './UserCreateWithoutFromTasksInputSchema';
import { UserUncheckedCreateWithoutFromTasksInputSchema } from './UserUncheckedCreateWithoutFromTasksInputSchema';
import { UserCreateOrConnectWithoutFromTasksInputSchema } from './UserCreateOrConnectWithoutFromTasksInputSchema';
import { UserUpsertWithoutFromTasksInputSchema } from './UserUpsertWithoutFromTasksInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutFromTasksInputSchema } from './UserUpdateToOneWithWhereWithoutFromTasksInputSchema';
import { UserUpdateWithoutFromTasksInputSchema } from './UserUpdateWithoutFromTasksInputSchema';
import { UserUncheckedUpdateWithoutFromTasksInputSchema } from './UserUncheckedUpdateWithoutFromTasksInputSchema';

export const UserUpdateOneRequiredWithoutFromTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFromTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFromTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFromTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFromTasksInputSchema),z.lazy(() => UserUpdateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromTasksInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutFromTasksNestedInputSchema;
