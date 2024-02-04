import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorIncludeSchema } from '../inputTypeSchemas/HonorIncludeSchema'
import { HonorWhereInputSchema } from '../inputTypeSchemas/HonorWhereInputSchema'
import { HonorOrderByWithRelationInputSchema } from '../inputTypeSchemas/HonorOrderByWithRelationInputSchema'
import { HonorWhereUniqueInputSchema } from '../inputTypeSchemas/HonorWhereUniqueInputSchema'
import { HonorScalarFieldEnumSchema } from '../inputTypeSchemas/HonorScalarFieldEnumSchema'
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

export const HonorFindFirstArgsSchema: z.ZodType<Prisma.HonorFindFirstArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereInputSchema.optional(),
  orderBy: z.union([ HonorOrderByWithRelationInputSchema.array(),HonorOrderByWithRelationInputSchema ]).optional(),
  cursor: HonorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HonorScalarFieldEnumSchema,HonorScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default HonorFindFirstArgsSchema;
