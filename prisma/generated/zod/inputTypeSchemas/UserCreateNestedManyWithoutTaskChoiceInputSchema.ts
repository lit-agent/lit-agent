import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutTaskChoiceInputSchema } from './UserCreateWithoutTaskChoiceInputSchema';
import { UserUncheckedCreateWithoutTaskChoiceInputSchema } from './UserUncheckedCreateWithoutTaskChoiceInputSchema';
import { UserCreateOrConnectWithoutTaskChoiceInputSchema } from './UserCreateOrConnectWithoutTaskChoiceInputSchema';
import { UserCreateManyTaskChoiceInputEnvelopeSchema } from './UserCreateManyTaskChoiceInputEnvelopeSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedManyWithoutTaskChoiceInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutTaskChoiceInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTaskChoiceInputSchema),z.lazy(() => UserCreateWithoutTaskChoiceInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTaskChoiceInputSchema),z.lazy(() => UserUncheckedCreateWithoutTaskChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTaskChoiceInputSchema),z.lazy(() => UserCreateOrConnectWithoutTaskChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyTaskChoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default UserCreateNestedManyWithoutTaskChoiceInputSchema;
