import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutBillsInputSchema } from './UserCreateWithoutBillsInputSchema';
import { UserUncheckedCreateWithoutBillsInputSchema } from './UserUncheckedCreateWithoutBillsInputSchema';
import { UserCreateOrConnectWithoutBillsInputSchema } from './UserCreateOrConnectWithoutBillsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutBillsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBillsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBillsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutBillsInputSchema;
