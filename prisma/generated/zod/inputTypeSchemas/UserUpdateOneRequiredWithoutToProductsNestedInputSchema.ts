import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutToProductsInputSchema } from './UserCreateWithoutToProductsInputSchema';
import { UserUncheckedCreateWithoutToProductsInputSchema } from './UserUncheckedCreateWithoutToProductsInputSchema';
import { UserCreateOrConnectWithoutToProductsInputSchema } from './UserCreateOrConnectWithoutToProductsInputSchema';
import { UserUpsertWithoutToProductsInputSchema } from './UserUpsertWithoutToProductsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutToProductsInputSchema } from './UserUpdateToOneWithWhereWithoutToProductsInputSchema';
import { UserUpdateWithoutToProductsInputSchema } from './UserUpdateWithoutToProductsInputSchema';
import { UserUncheckedUpdateWithoutToProductsInputSchema } from './UserUncheckedUpdateWithoutToProductsInputSchema';

export const UserUpdateOneRequiredWithoutToProductsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutToProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutToProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutToProductsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutToProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutToProductsInputSchema),z.lazy(() => UserUpdateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToProductsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutToProductsNestedInputSchema;
