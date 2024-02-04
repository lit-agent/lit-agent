import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BillUpdateManyMutationInputSchema } from '../inputTypeSchemas/BillUpdateManyMutationInputSchema'
import { BillUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/BillUncheckedUpdateManyInputSchema'
import { BillWhereInputSchema } from '../inputTypeSchemas/BillWhereInputSchema'

export const BillUpdateManyArgsSchema: z.ZodType<Prisma.BillUpdateManyArgs> = z.object({
  data: z.union([ BillUpdateManyMutationInputSchema,BillUncheckedUpdateManyInputSchema ]),
  where: BillWhereInputSchema.optional(),
}).strict()

export default BillUpdateManyArgsSchema;
