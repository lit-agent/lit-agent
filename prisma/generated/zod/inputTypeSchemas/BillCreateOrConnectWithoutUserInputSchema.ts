import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';
import { BillCreateWithoutUserInputSchema } from './BillCreateWithoutUserInputSchema';
import { BillUncheckedCreateWithoutUserInputSchema } from './BillUncheckedCreateWithoutUserInputSchema';

export const BillCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BillCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default BillCreateOrConnectWithoutUserInputSchema;
