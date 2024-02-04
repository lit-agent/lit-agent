import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillCreateWithoutProductInputSchema } from './BillCreateWithoutProductInputSchema';
import { BillUncheckedCreateWithoutProductInputSchema } from './BillUncheckedCreateWithoutProductInputSchema';
import { BillCreateOrConnectWithoutProductInputSchema } from './BillCreateOrConnectWithoutProductInputSchema';
import { BillCreateManyProductInputEnvelopeSchema } from './BillCreateManyProductInputEnvelopeSchema';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';

export const BillUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.BillUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillCreateWithoutProductInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutProductInputSchema),z.lazy(() => BillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default BillUncheckedCreateNestedManyWithoutProductInputSchema;
