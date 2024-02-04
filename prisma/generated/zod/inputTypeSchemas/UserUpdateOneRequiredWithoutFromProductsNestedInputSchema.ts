import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutFromProductsInputSchema } from './UserCreateWithoutFromProductsInputSchema';
import { UserUncheckedCreateWithoutFromProductsInputSchema } from './UserUncheckedCreateWithoutFromProductsInputSchema';
import { UserCreateOrConnectWithoutFromProductsInputSchema } from './UserCreateOrConnectWithoutFromProductsInputSchema';
import { UserUpsertWithoutFromProductsInputSchema } from './UserUpsertWithoutFromProductsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutFromProductsInputSchema } from './UserUpdateToOneWithWhereWithoutFromProductsInputSchema';
import { UserUpdateWithoutFromProductsInputSchema } from './UserUpdateWithoutFromProductsInputSchema';
import { UserUncheckedUpdateWithoutFromProductsInputSchema } from './UserUncheckedUpdateWithoutFromProductsInputSchema';

export const UserUpdateOneRequiredWithoutFromProductsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFromProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFromProductsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFromProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFromProductsInputSchema),z.lazy(() => UserUpdateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromProductsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutFromProductsNestedInputSchema;
