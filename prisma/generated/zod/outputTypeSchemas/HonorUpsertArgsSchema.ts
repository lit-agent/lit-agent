import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorIncludeSchema } from '../inputTypeSchemas/HonorIncludeSchema'
import { HonorWhereUniqueInputSchema } from '../inputTypeSchemas/HonorWhereUniqueInputSchema'
import { HonorCreateInputSchema } from '../inputTypeSchemas/HonorCreateInputSchema'
import { HonorUncheckedCreateInputSchema } from '../inputTypeSchemas/HonorUncheckedCreateInputSchema'
import { HonorUpdateInputSchema } from '../inputTypeSchemas/HonorUpdateInputSchema'
import { HonorUncheckedUpdateInputSchema } from '../inputTypeSchemas/HonorUncheckedUpdateInputSchema'
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

export const HonorUpsertArgsSchema: z.ZodType<Prisma.HonorUpsertArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereUniqueInputSchema,
  create: z.union([ HonorCreateInputSchema,HonorUncheckedCreateInputSchema ]),
  update: z.union([ HonorUpdateInputSchema,HonorUncheckedUpdateInputSchema ]),
}).strict()

export default HonorUpsertArgsSchema;
