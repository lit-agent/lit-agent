import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutBillsInputSchema } from './UserCreateWithoutBillsInputSchema';
import { UserUncheckedCreateWithoutBillsInputSchema } from './UserUncheckedCreateWithoutBillsInputSchema';
import { UserCreateOrConnectWithoutBillsInputSchema } from './UserCreateOrConnectWithoutBillsInputSchema';
import { UserUpsertWithoutBillsInputSchema } from './UserUpsertWithoutBillsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutBillsInputSchema } from './UserUpdateToOneWithWhereWithoutBillsInputSchema';
import { UserUpdateWithoutBillsInputSchema } from './UserUpdateWithoutBillsInputSchema';
import { UserUncheckedUpdateWithoutBillsInputSchema } from './UserUncheckedUpdateWithoutBillsInputSchema';

export const UserUpdateOneRequiredWithoutBillsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBillsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBillsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBillsInputSchema),z.lazy(() => UserUpdateWithoutBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBillsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutBillsNestedInputSchema;
