import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToCreateManyTaskInputSchema } from './TaskToCreateManyTaskInputSchema';

export const TaskToCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.TaskToCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskToCreateManyTaskInputSchema),z.lazy(() => TaskToCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default TaskToCreateManyTaskInputEnvelopeSchema;
