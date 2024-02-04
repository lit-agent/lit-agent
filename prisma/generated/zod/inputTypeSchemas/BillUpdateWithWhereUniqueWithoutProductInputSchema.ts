import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';
import { BillUpdateWithoutProductInputSchema } from './BillUpdateWithoutProductInputSchema';
import { BillUncheckedUpdateWithoutProductInputSchema } from './BillUncheckedUpdateWithoutProductInputSchema';

export const BillUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.BillUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BillUpdateWithoutProductInputSchema),z.lazy(() => BillUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export default BillUpdateWithWhereUniqueWithoutProductInputSchema;
