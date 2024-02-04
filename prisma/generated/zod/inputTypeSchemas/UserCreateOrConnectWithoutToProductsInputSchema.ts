import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutToProductsInputSchema } from './UserCreateWithoutToProductsInputSchema';
import { UserUncheckedCreateWithoutToProductsInputSchema } from './UserUncheckedCreateWithoutToProductsInputSchema';

export const UserCreateOrConnectWithoutToProductsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutToProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutToProductsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutToProductsInputSchema;
