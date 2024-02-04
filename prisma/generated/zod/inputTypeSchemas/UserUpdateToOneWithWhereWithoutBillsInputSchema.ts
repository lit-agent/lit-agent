import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutBillsInputSchema } from './UserUpdateWithoutBillsInputSchema';
import { UserUncheckedUpdateWithoutBillsInputSchema } from './UserUncheckedUpdateWithoutBillsInputSchema';

export const UserUpdateToOneWithWhereWithoutBillsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBillsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBillsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutBillsInputSchema;
