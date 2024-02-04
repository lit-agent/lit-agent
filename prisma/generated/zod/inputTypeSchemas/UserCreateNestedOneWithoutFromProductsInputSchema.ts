import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutFromProductsInputSchema } from './UserCreateWithoutFromProductsInputSchema';
import { UserUncheckedCreateWithoutFromProductsInputSchema } from './UserUncheckedCreateWithoutFromProductsInputSchema';
import { UserCreateOrConnectWithoutFromProductsInputSchema } from './UserCreateOrConnectWithoutFromProductsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutFromProductsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFromProductsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFromProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutFromProductsInputSchema;
