import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutReceivedMessagesInputSchema } from './UserCreateWithoutReceivedMessagesInputSchema';
import { UserUncheckedCreateWithoutReceivedMessagesInputSchema } from './UserUncheckedCreateWithoutReceivedMessagesInputSchema';
import { UserCreateOrConnectWithoutReceivedMessagesInputSchema } from './UserCreateOrConnectWithoutReceivedMessagesInputSchema';
import { UserUpsertWithWhereUniqueWithoutReceivedMessagesInputSchema } from './UserUpsertWithWhereUniqueWithoutReceivedMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithWhereUniqueWithoutReceivedMessagesInputSchema } from './UserUpdateWithWhereUniqueWithoutReceivedMessagesInputSchema';
import { UserUpdateManyWithWhereWithoutReceivedMessagesInputSchema } from './UserUpdateManyWithWhereWithoutReceivedMessagesInputSchema';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';

export const UserUncheckedUpdateManyWithoutReceivedMessagesNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutReceivedMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutReceivedMessagesInputSchema),z.lazy(() => UserCreateOrConnectWithoutReceivedMessagesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutReceivedMessagesInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutReceivedMessagesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutReceivedMessagesInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutReceivedMessagesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutReceivedMessagesInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutReceivedMessagesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default UserUncheckedUpdateManyWithoutReceivedMessagesNestedInputSchema;
