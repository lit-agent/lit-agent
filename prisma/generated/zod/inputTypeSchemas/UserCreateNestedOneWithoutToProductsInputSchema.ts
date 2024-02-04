import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutToProductsInputSchema } from './UserCreateWithoutToProductsInputSchema';
import { UserUncheckedCreateWithoutToProductsInputSchema } from './UserUncheckedCreateWithoutToProductsInputSchema';
import { UserCreateOrConnectWithoutToProductsInputSchema } from './UserCreateOrConnectWithoutToProductsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutToProductsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutToProductsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutToProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutToProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutToProductsInputSchema;
