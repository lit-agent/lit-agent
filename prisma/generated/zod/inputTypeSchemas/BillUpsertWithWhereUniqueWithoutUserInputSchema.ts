import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';
import { BillUpdateWithoutUserInputSchema } from './BillUpdateWithoutUserInputSchema';
import { BillUncheckedUpdateWithoutUserInputSchema } from './BillUncheckedUpdateWithoutUserInputSchema';
import { BillCreateWithoutUserInputSchema } from './BillCreateWithoutUserInputSchema';
import { BillUncheckedCreateWithoutUserInputSchema } from './BillUncheckedCreateWithoutUserInputSchema';

export const BillUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BillUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BillUpdateWithoutUserInputSchema),z.lazy(() => BillUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default BillUpsertWithWhereUniqueWithoutUserInputSchema;
