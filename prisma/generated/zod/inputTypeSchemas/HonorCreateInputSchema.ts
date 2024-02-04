import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';
import { UserCreateNestedOneWithoutHonorsInputSchema } from './UserCreateNestedOneWithoutHonorsInputSchema';

export const HonorCreateInputSchema: z.ZodType<Prisma.HonorCreateInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutHonorsInputSchema)
}).strict();

export default HonorCreateInputSchema;
