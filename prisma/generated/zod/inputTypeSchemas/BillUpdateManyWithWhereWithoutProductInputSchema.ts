import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillScalarWhereInputSchema } from './BillScalarWhereInputSchema';
import { BillUpdateManyMutationInputSchema } from './BillUpdateManyMutationInputSchema';
import { BillUncheckedUpdateManyWithoutProductInputSchema } from './BillUncheckedUpdateManyWithoutProductInputSchema';

export const BillUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.BillUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => BillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BillUpdateManyMutationInputSchema),z.lazy(() => BillUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export default BillUpdateManyWithWhereWithoutProductInputSchema;
