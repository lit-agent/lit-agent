import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutHonorsInputSchema } from './UserCreateWithoutHonorsInputSchema';
import { UserUncheckedCreateWithoutHonorsInputSchema } from './UserUncheckedCreateWithoutHonorsInputSchema';

export const UserCreateOrConnectWithoutHonorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHonorsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHonorsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutHonorsInputSchema;
