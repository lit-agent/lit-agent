import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutSentMessagesInputSchema } from './UserCreateWithoutSentMessagesInputSchema';
import { UserUncheckedCreateWithoutSentMessagesInputSchema } from './UserUncheckedCreateWithoutSentMessagesInputSchema';
import { UserCreateOrConnectWithoutSentMessagesInputSchema } from './UserCreateOrConnectWithoutSentMessagesInputSchema';
import { UserUpsertWithoutSentMessagesInputSchema } from './UserUpsertWithoutSentMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutSentMessagesInputSchema } from './UserUpdateToOneWithWhereWithoutSentMessagesInputSchema';
import { UserUpdateWithoutSentMessagesInputSchema } from './UserUpdateWithoutSentMessagesInputSchema';
import { UserUncheckedUpdateWithoutSentMessagesInputSchema } from './UserUncheckedUpdateWithoutSentMessagesInputSchema';

export const UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSentMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSentMessagesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSentMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSentMessagesInputSchema),z.lazy(() => UserUpdateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema;
