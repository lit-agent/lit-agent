import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutFromProductsInputSchema } from './UserCreateWithoutFromProductsInputSchema';
import { UserUncheckedCreateWithoutFromProductsInputSchema } from './UserUncheckedCreateWithoutFromProductsInputSchema';

export const UserCreateOrConnectWithoutFromProductsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFromProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromProductsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutFromProductsInputSchema;
