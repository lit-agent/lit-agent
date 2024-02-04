import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceWhereUniqueInputSchema } from './TaskChoiceWhereUniqueInputSchema';
import { TaskChoiceCreateWithoutTaskFromInputSchema } from './TaskChoiceCreateWithoutTaskFromInputSchema';
import { TaskChoiceUncheckedCreateWithoutTaskFromInputSchema } from './TaskChoiceUncheckedCreateWithoutTaskFromInputSchema';

export const TaskChoiceCreateOrConnectWithoutTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceCreateOrConnectWithoutTaskFromInput> = z.object({
  where: z.lazy(() => TaskChoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskChoiceCreateWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUncheckedCreateWithoutTaskFromInputSchema) ]),
}).strict();

export default TaskChoiceCreateOrConnectWithoutTaskFromInputSchema;
