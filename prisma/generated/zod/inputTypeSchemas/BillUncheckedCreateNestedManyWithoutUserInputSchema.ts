import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillCreateWithoutUserInputSchema } from './BillCreateWithoutUserInputSchema';
import { BillUncheckedCreateWithoutUserInputSchema } from './BillUncheckedCreateWithoutUserInputSchema';
import { BillCreateOrConnectWithoutUserInputSchema } from './BillCreateOrConnectWithoutUserInputSchema';
import { BillCreateManyUserInputEnvelopeSchema } from './BillCreateManyUserInputEnvelopeSchema';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';

export const BillUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BillUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillCreateWithoutUserInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutUserInputSchema),z.lazy(() => BillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default BillUncheckedCreateNestedManyWithoutUserInputSchema;
