import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutToProductsInputSchema } from './UserUpdateWithoutToProductsInputSchema';
import { UserUncheckedUpdateWithoutToProductsInputSchema } from './UserUncheckedUpdateWithoutToProductsInputSchema';

export const UserUpdateToOneWithWhereWithoutToProductsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutToProductsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToProductsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutToProductsInputSchema;
