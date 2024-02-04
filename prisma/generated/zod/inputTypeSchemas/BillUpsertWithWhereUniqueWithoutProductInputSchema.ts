import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';
import { BillUpdateWithoutProductInputSchema } from './BillUpdateWithoutProductInputSchema';
import { BillUncheckedUpdateWithoutProductInputSchema } from './BillUncheckedUpdateWithoutProductInputSchema';
import { BillCreateWithoutProductInputSchema } from './BillCreateWithoutProductInputSchema';
import { BillUncheckedCreateWithoutProductInputSchema } from './BillUncheckedCreateWithoutProductInputSchema';

export const BillUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.BillUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BillUpdateWithoutProductInputSchema),z.lazy(() => BillUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export default BillUpsertWithWhereUniqueWithoutProductInputSchema;
