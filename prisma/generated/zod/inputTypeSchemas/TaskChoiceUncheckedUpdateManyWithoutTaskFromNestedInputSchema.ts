import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceCreateWithoutTaskFromInputSchema } from './TaskChoiceCreateWithoutTaskFromInputSchema';
import { TaskChoiceUncheckedCreateWithoutTaskFromInputSchema } from './TaskChoiceUncheckedCreateWithoutTaskFromInputSchema';
import { TaskChoiceCreateOrConnectWithoutTaskFromInputSchema } from './TaskChoiceCreateOrConnectWithoutTaskFromInputSchema';
import { TaskChoiceUpsertWithWhereUniqueWithoutTaskFromInputSchema } from './TaskChoiceUpsertWithWhereUniqueWithoutTaskFromInputSchema';
import { TaskChoiceCreateManyTaskFromInputEnvelopeSchema } from './TaskChoiceCreateManyTaskFromInputEnvelopeSchema';
import { TaskChoiceWhereUniqueInputSchema } from './TaskChoiceWhereUniqueInputSchema';
import { TaskChoiceUpdateWithWhereUniqueWithoutTaskFromInputSchema } from './TaskChoiceUpdateWithWhereUniqueWithoutTaskFromInputSchema';
import { TaskChoiceUpdateManyWithWhereWithoutTaskFromInputSchema } from './TaskChoiceUpdateManyWithWhereWithoutTaskFromInputSchema';
import { TaskChoiceScalarWhereInputSchema } from './TaskChoiceScalarWhereInputSchema';

export const TaskChoiceUncheckedUpdateManyWithoutTaskFromNestedInputSchema: z.ZodType<Prisma.TaskChoiceUncheckedUpdateManyWithoutTaskFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskChoiceCreateWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceCreateWithoutTaskFromInputSchema).array(),z.lazy(() => TaskChoiceUncheckedCreateWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUncheckedCreateWithoutTaskFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskChoiceCreateOrConnectWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceCreateOrConnectWithoutTaskFromInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskChoiceUpsertWithWhereUniqueWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUpsertWithWhereUniqueWithoutTaskFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskChoiceCreateManyTaskFromInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskChoiceWhereUniqueInputSchema),z.lazy(() => TaskChoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskChoiceWhereUniqueInputSchema),z.lazy(() => TaskChoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskChoiceWhereUniqueInputSchema),z.lazy(() => TaskChoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskChoiceWhereUniqueInputSchema),z.lazy(() => TaskChoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskChoiceUpdateWithWhereUniqueWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUpdateWithWhereUniqueWithoutTaskFromInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskChoiceUpdateManyWithWhereWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUpdateManyWithWhereWithoutTaskFromInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskChoiceScalarWhereInputSchema),z.lazy(() => TaskChoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TaskChoiceUncheckedUpdateManyWithoutTaskFromNestedInputSchema;
