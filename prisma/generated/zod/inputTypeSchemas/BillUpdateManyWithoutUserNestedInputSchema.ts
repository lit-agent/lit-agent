import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillCreateWithoutUserInputSchema } from './BillCreateWithoutUserInputSchema';
import { BillUncheckedCreateWithoutUserInputSchema } from './BillUncheckedCreateWithoutUserInputSchema';
import { BillCreateOrConnectWithoutUserInputSchema } from './BillCreateOrConnectWithoutUserInputSchema';
import { BillUpsertWithWhereUniqueWithoutUserInputSchema } from './BillUpsertWithWhereUniqueWithoutUserInputSchema';
import { BillCreateManyUserInputEnvelopeSchema } from './BillCreateManyUserInputEnvelopeSchema';
import { BillWhereUniqueInputSchema } from './BillWhereUniqueInputSchema';
import { BillUpdateWithWhereUniqueWithoutUserInputSchema } from './BillUpdateWithWhereUniqueWithoutUserInputSchema';
import { BillUpdateManyWithWhereWithoutUserInputSchema } from './BillUpdateManyWithWhereWithoutUserInputSchema';
import { BillScalarWhereInputSchema } from './BillScalarWhereInputSchema';

export const BillUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BillUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillCreateWithoutUserInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutUserInputSchema),z.lazy(() => BillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default BillUpdateManyWithoutUserNestedInputSchema;
