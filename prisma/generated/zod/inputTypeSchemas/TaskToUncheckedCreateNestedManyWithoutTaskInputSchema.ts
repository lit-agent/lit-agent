import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToCreateWithoutTaskInputSchema } from './TaskToCreateWithoutTaskInputSchema';
import { TaskToUncheckedCreateWithoutTaskInputSchema } from './TaskToUncheckedCreateWithoutTaskInputSchema';
import { TaskToCreateOrConnectWithoutTaskInputSchema } from './TaskToCreateOrConnectWithoutTaskInputSchema';
import { TaskToCreateManyTaskInputEnvelopeSchema } from './TaskToCreateManyTaskInputEnvelopeSchema';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';

export const TaskToUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TaskToUncheckedCreateNestedManyWithoutTaskInputSchema;
