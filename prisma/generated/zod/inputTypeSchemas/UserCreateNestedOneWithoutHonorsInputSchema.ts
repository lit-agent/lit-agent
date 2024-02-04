import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutHonorsInputSchema } from './UserCreateWithoutHonorsInputSchema';
import { UserUncheckedCreateWithoutHonorsInputSchema } from './UserUncheckedCreateWithoutHonorsInputSchema';
import { UserCreateOrConnectWithoutHonorsInputSchema } from './UserCreateOrConnectWithoutHonorsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutHonorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHonorsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHonorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHonorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutHonorsInputSchema;
