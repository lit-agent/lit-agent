import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToCreateWithoutUserInputSchema } from './TaskToCreateWithoutUserInputSchema';
import { TaskToUncheckedCreateWithoutUserInputSchema } from './TaskToUncheckedCreateWithoutUserInputSchema';
import { TaskToCreateOrConnectWithoutUserInputSchema } from './TaskToCreateOrConnectWithoutUserInputSchema';
import { TaskToCreateManyUserInputEnvelopeSchema } from './TaskToCreateManyUserInputEnvelopeSchema';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';

export const TaskToCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TaskToCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToCreateWithoutUserInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TaskToCreateNestedManyWithoutUserInputSchema;
