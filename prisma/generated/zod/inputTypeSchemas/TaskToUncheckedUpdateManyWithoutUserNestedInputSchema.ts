import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToCreateWithoutUserInputSchema } from './TaskToCreateWithoutUserInputSchema';
import { TaskToUncheckedCreateWithoutUserInputSchema } from './TaskToUncheckedCreateWithoutUserInputSchema';
import { TaskToCreateOrConnectWithoutUserInputSchema } from './TaskToCreateOrConnectWithoutUserInputSchema';
import { TaskToUpsertWithWhereUniqueWithoutUserInputSchema } from './TaskToUpsertWithWhereUniqueWithoutUserInputSchema';
import { TaskToCreateManyUserInputEnvelopeSchema } from './TaskToCreateManyUserInputEnvelopeSchema';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';
import { TaskToUpdateWithWhereUniqueWithoutUserInputSchema } from './TaskToUpdateWithWhereUniqueWithoutUserInputSchema';
import { TaskToUpdateManyWithWhereWithoutUserInputSchema } from './TaskToUpdateManyWithWhereWithoutUserInputSchema';
import { TaskToScalarWhereInputSchema } from './TaskToScalarWhereInputSchema';

export const TaskToUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToCreateWithoutUserInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskToUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskToUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskToUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskToUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskToUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TaskToUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TaskToUncheckedUpdateManyWithoutUserNestedInputSchema;
