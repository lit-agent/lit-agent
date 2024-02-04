import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorIncludeSchema } from '../inputTypeSchemas/HonorIncludeSchema'
import { HonorUpdateInputSchema } from '../inputTypeSchemas/HonorUpdateInputSchema'
import { HonorUncheckedUpdateInputSchema } from '../inputTypeSchemas/HonorUncheckedUpdateInputSchema'
import { HonorWhereUniqueInputSchema } from '../inputTypeSchemas/HonorWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const HonorSelectSchema: z.ZodType<Prisma.HonorSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const HonorUpdateArgsSchema: z.ZodType<Prisma.HonorUpdateArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  data: z.union([ HonorUpdateInputSchema,HonorUncheckedUpdateInputSchema ]),
  where: HonorWhereUniqueInputSchema,
}).strict()

export default HonorUpdateArgsSchema;
