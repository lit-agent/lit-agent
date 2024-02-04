import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutBillsInputSchema } from './UserCreateWithoutBillsInputSchema';
import { UserUncheckedCreateWithoutBillsInputSchema } from './UserUncheckedCreateWithoutBillsInputSchema';

export const UserCreateOrConnectWithoutBillsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBillsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBillsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutBillsInputSchema;
