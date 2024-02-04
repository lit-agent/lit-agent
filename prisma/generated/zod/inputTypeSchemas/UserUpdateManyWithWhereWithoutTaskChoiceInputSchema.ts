import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';
import { UserUpdateManyMutationInputSchema } from './UserUpdateManyMutationInputSchema';
import { UserUncheckedUpdateManyWithoutTaskChoiceInputSchema } from './UserUncheckedUpdateManyWithoutTaskChoiceInputSchema';

export const UserUpdateManyWithWhereWithoutTaskChoiceInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutTaskChoiceInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutTaskChoiceInputSchema) ]),
}).strict();

export default UserUpdateManyWithWhereWithoutTaskChoiceInputSchema;
