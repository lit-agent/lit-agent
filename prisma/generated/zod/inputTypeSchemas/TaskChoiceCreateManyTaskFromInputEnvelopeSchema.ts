import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceCreateManyTaskFromInputSchema } from './TaskChoiceCreateManyTaskFromInputSchema';

export const TaskChoiceCreateManyTaskFromInputEnvelopeSchema: z.ZodType<Prisma.TaskChoiceCreateManyTaskFromInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskChoiceCreateManyTaskFromInputSchema),z.lazy(() => TaskChoiceCreateManyTaskFromInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default TaskChoiceCreateManyTaskFromInputEnvelopeSchema;
