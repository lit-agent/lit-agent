import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToCreateManyUserInputSchema } from './TaskToCreateManyUserInputSchema';

export const TaskToCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TaskToCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskToCreateManyUserInputSchema),z.lazy(() => TaskToCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default TaskToCreateManyUserInputEnvelopeSchema;
