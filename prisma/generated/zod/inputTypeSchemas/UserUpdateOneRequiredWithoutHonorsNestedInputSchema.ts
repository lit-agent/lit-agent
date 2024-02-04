import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutHonorsInputSchema } from './UserCreateWithoutHonorsInputSchema';
import { UserUncheckedCreateWithoutHonorsInputSchema } from './UserUncheckedCreateWithoutHonorsInputSchema';
import { UserCreateOrConnectWithoutHonorsInputSchema } from './UserCreateOrConnectWithoutHonorsInputSchema';
import { UserUpsertWithoutHonorsInputSchema } from './UserUpsertWithoutHonorsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutHonorsInputSchema } from './UserUpdateToOneWithWhereWithoutHonorsInputSchema';
import { UserUpdateWithoutHonorsInputSchema } from './UserUpdateWithoutHonorsInputSchema';
import { UserUncheckedUpdateWithoutHonorsInputSchema } from './UserUncheckedUpdateWithoutHonorsInputSchema';

export const UserUpdateOneRequiredWithoutHonorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutHonorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHonorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHonorsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHonorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHonorsInputSchema),z.lazy(() => UserUpdateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHonorsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutHonorsNestedInputSchema;
