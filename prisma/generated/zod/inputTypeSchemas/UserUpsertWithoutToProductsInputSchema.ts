import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutToProductsInputSchema } from './UserUpdateWithoutToProductsInputSchema';
import { UserUncheckedUpdateWithoutToProductsInputSchema } from './UserUncheckedUpdateWithoutToProductsInputSchema';
import { UserCreateWithoutToProductsInputSchema } from './UserCreateWithoutToProductsInputSchema';
import { UserUncheckedCreateWithoutToProductsInputSchema } from './UserUncheckedCreateWithoutToProductsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutToProductsInputSchema: z.ZodType<Prisma.UserUpsertWithoutToProductsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToProductsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutToProductsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutToProductsInputSchema;
