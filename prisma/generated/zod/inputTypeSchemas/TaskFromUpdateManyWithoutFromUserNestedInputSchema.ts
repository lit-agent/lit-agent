import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateWithoutFromUserInputSchema } from './TaskFromCreateWithoutFromUserInputSchema';
import { TaskFromUncheckedCreateWithoutFromUserInputSchema } from './TaskFromUncheckedCreateWithoutFromUserInputSchema';
import { TaskFromCreateOrConnectWithoutFromUserInputSchema } from './TaskFromCreateOrConnectWithoutFromUserInputSchema';
import { TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema } from './TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema';
import { TaskFromCreateManyFromUserInputEnvelopeSchema } from './TaskFromCreateManyFromUserInputEnvelopeSchema';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema } from './TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema';
import { TaskFromUpdateManyWithWhereWithoutFromUserInputSchema } from './TaskFromUpdateManyWithWhereWithoutFromUserInputSchema';
import { TaskFromScalarWhereInputSchema } from './TaskFromScalarWhereInputSchema';

export const TaskFromUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.TaskFromUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskFromCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskFromUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => TaskFromUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskFromScalarWhereInputSchema),z.lazy(() => TaskFromScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TaskFromUpdateManyWithoutFromUserNestedInputSchema;
