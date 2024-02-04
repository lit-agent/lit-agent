import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillCreateWithoutProductInputSchema } from './BillCreateWithoutProductInputSchema';
import { BillUncheckedCreateWithoutProductInputSchema } from './BillUncheckedCreateWithoutProductInputSchema';
import { BillCreateOrConnectWithoutProductInputSchema } from './BillCreateOrConnectWithoutProductInputSchema';
import { BillUpsertWithWhereUniqueWithoutProductInputSchema } from './BillUpsertWithWhereUniqueWithoutProductInputSchema';
import { BillCreateManyProductInputEnvelopeSchema } from './BillCreateManyProductInputEnvelopeSchema';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';
import { BillUpdateWithWhereUniqueWithoutProductInputSchema } from './BillUpdateWithWhereUniqueWithoutProductInputSchema';
import { BillUpdateManyWithWhereWithoutProductInputSchema } from './BillUpdateManyWithWhereWithoutProductInputSchema';
import { BillScalarWhereInputSchema } from './BillScalarWhereInputSchema';

export const BillUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.BillUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillCreateWithoutProductInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutProductInputSchema),z.lazy(() => BillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BillUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => BillUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BillUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => BillUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BillUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => BillUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default BillUpdateManyWithoutProductNestedInputSchema;
