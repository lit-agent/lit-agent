import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BillCreateManyInputSchema } from '../inputTypeSchemas/BillCreateManyInputSchema'

export const BillCreateManyArgsSchema: z.ZodType<Prisma.BillCreateManyArgs> = z.object({
  data: z.union([ BillCreateManyInputSchema,BillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default BillCreateManyArgsSchema;
