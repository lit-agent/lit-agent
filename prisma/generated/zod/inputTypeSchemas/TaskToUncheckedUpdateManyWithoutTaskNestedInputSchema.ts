import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToCreateWithoutTaskInputSchema } from './TaskToCreateWithoutTaskInputSchema';
import { TaskToUncheckedCreateWithoutTaskInputSchema } from './TaskToUncheckedCreateWithoutTaskInputSchema';
import { TaskToCreateOrConnectWithoutTaskInputSchema } from './TaskToCreateOrConnectWithoutTaskInputSchema';
import { TaskToUpsertWithWhereUniqueWithoutTaskInputSchema } from './TaskToUpsertWithWhereUniqueWithoutTaskInputSchema';
import { TaskToCreateManyTaskInputEnvelopeSchema } from './TaskToCreateManyTaskInputEnvelopeSchema';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';
import { TaskToUpdateWithWhereUniqueWithoutTaskInputSchema } from './TaskToUpdateWithWhereUniqueWithoutTaskInputSchema';
import { TaskToUpdateManyWithWhereWithoutTaskInputSchema } from './TaskToUpdateManyWithWhereWithoutTaskInputSchema';
import { TaskToScalarWhereInputSchema } from './TaskToScalarWhereInputSchema';

export const TaskToUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskToUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskToUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskToUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskToUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskToUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => TaskToUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TaskToUncheckedUpdateManyWithoutTaskNestedInputSchema;
