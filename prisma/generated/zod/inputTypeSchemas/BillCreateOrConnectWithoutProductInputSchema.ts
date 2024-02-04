import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';
import { BillCreateWithoutProductInputSchema } from './BillCreateWithoutProductInputSchema';
import { BillUncheckedCreateWithoutProductInputSchema } from './BillUncheckedCreateWithoutProductInputSchema';

export const BillCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.BillCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export default BillCreateOrConnectWithoutProductInputSchema;
