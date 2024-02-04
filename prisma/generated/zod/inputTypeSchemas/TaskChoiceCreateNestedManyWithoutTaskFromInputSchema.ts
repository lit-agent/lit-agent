import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceCreateWithoutTaskFromInputSchema } from './TaskChoiceCreateWithoutTaskFromInputSchema';
import { TaskChoiceUncheckedCreateWithoutTaskFromInputSchema } from './TaskChoiceUncheckedCreateWithoutTaskFromInputSchema';
import { TaskChoiceCreateOrConnectWithoutTaskFromInputSchema } from './TaskChoiceCreateOrConnectWithoutTaskFromInputSchema';
import { TaskChoiceCreateManyTaskFromInputEnvelopeSchema } from './TaskChoiceCreateManyTaskFromInputEnvelopeSchema';
import { TaskChoiceWhereUniqueInputSchema } from './TaskChoiceWhereUniqueInputSchema';

export const TaskChoiceCreateNestedManyWithoutTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceCreateNestedManyWithoutTaskFromInput> = z.object({
  create: z.union([ z.lazy(() => TaskChoiceCreateWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceCreateWithoutTaskFromInputSchema).array(),z.lazy(() => TaskChoiceUncheckedCreateWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUncheckedCreateWithoutTaskFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskChoiceCreateOrConnectWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceCreateOrConnectWithoutTaskFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskChoiceCreateManyTaskFromInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskChoiceWhereUniqueInputSchema),z.lazy(() => TaskChoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TaskChoiceCreateNestedManyWithoutTaskFromInputSchema;
