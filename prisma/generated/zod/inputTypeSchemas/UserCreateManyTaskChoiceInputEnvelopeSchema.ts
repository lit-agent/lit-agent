import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateManyTaskChoiceInputSchema } from './UserCreateManyTaskChoiceInputSchema';

export const UserCreateManyTaskChoiceInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyTaskChoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyTaskChoiceInputSchema),z.lazy(() => UserCreateManyTaskChoiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default UserCreateManyTaskChoiceInputEnvelopeSchema;
