import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutFromProductsInputSchema } from './UserUpdateWithoutFromProductsInputSchema';
import { UserUncheckedUpdateWithoutFromProductsInputSchema } from './UserUncheckedUpdateWithoutFromProductsInputSchema';
import { UserCreateWithoutFromProductsInputSchema } from './UserCreateWithoutFromProductsInputSchema';
import { UserUncheckedCreateWithoutFromProductsInputSchema } from './UserUncheckedCreateWithoutFromProductsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutFromProductsInputSchema: z.ZodType<Prisma.UserUpsertWithoutFromProductsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromProductsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromProductsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutFromProductsInputSchema;
