import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutBillsInputSchema } from './UserUpdateWithoutBillsInputSchema';
import { UserUncheckedUpdateWithoutBillsInputSchema } from './UserUncheckedUpdateWithoutBillsInputSchema';
import { UserCreateWithoutBillsInputSchema } from './UserCreateWithoutBillsInputSchema';
import { UserUncheckedCreateWithoutBillsInputSchema } from './UserUncheckedCreateWithoutBillsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutBillsInputSchema: z.ZodType<Prisma.UserUpsertWithoutBillsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBillsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBillsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutBillsInputSchema;
