import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutFromProductsInputSchema } from './UserUpdateWithoutFromProductsInputSchema';
import { UserUncheckedUpdateWithoutFromProductsInputSchema } from './UserUncheckedUpdateWithoutFromProductsInputSchema';

export const UserUpdateToOneWithWhereWithoutFromProductsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFromProductsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromProductsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutFromProductsInputSchema;
