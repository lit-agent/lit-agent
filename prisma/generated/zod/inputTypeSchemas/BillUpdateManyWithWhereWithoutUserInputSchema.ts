import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillScalarWhereInputSchema } from './BillScalarWhereInputSchema';
import { BillUpdateManyMutationInputSchema } from './BillUpdateManyMutationInputSchema';
import { BillUncheckedUpdateManyWithoutUserInputSchema } from './BillUncheckedUpdateManyWithoutUserInputSchema';

export const BillUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BillUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BillUpdateManyMutationInputSchema),z.lazy(() => BillUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default BillUpdateManyWithWhereWithoutUserInputSchema;
