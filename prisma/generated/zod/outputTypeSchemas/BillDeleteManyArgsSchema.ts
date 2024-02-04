import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BillWhereInputSchema } from '../inputTypeSchemas/BillWhereInputSchema'

export const BillDeleteManyArgsSchema: z.ZodType<Prisma.BillDeleteManyArgs> = z.object({
  where: BillWhereInputSchema.optional(),
}).strict()

export default BillDeleteManyArgsSchema;
