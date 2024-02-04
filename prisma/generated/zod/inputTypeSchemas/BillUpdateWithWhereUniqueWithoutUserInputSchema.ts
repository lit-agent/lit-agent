import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';
import { BillUpdateWithoutUserInputSchema } from './BillUpdateWithoutUserInputSchema';
import { BillUncheckedUpdateWithoutUserInputSchema } from './BillUncheckedUpdateWithoutUserInputSchema';

export const BillUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BillUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BillUpdateWithoutUserInputSchema),z.lazy(() => BillUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default BillUpdateWithWhereUniqueWithoutUserInputSchema;
