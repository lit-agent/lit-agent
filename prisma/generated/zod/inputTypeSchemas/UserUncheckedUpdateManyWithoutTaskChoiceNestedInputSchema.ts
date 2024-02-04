import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutTaskChoiceInputSchema } from './UserCreateWithoutTaskChoiceInputSchema';
import { UserUncheckedCreateWithoutTaskChoiceInputSchema } from './UserUncheckedCreateWithoutTaskChoiceInputSchema';
import { UserCreateOrConnectWithoutTaskChoiceInputSchema } from './UserCreateOrConnectWithoutTaskChoiceInputSchema';
import { UserUpsertWithWhereUniqueWithoutTaskChoiceInputSchema } from './UserUpsertWithWhereUniqueWithoutTaskChoiceInputSchema';
import { UserCreateManyTaskChoiceInputEnvelopeSchema } from './UserCreateManyTaskChoiceInputEnvelopeSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithWhereUniqueWithoutTaskChoiceInputSchema } from './UserUpdateWithWhereUniqueWithoutTaskChoiceInputSchema';
import { UserUpdateManyWithWhereWithoutTaskChoiceInputSchema } from './UserUpdateManyWithWhereWithoutTaskChoiceInputSchema';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';

export const UserUncheckedUpdateManyWithoutTaskChoiceNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutTaskChoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTaskChoiceInputSchema),z.lazy(() => UserCreateWithoutTaskChoiceInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTaskChoiceInputSchema),z.lazy(() => UserUncheckedCreateWithoutTaskChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTaskChoiceInputSchema),z.lazy(() => UserCreateOrConnectWithoutTaskChoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTaskChoiceInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutTaskChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyTaskChoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTaskChoiceInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutTaskChoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTaskChoiceInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutTaskChoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default UserUncheckedUpdateManyWithoutTaskChoiceNestedInputSchema;
