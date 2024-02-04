import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateManyFromUserInputSchema } from './TaskFromCreateManyFromUserInputSchema';

export const TaskFromCreateManyFromUserInputEnvelopeSchema: z.ZodType<Prisma.TaskFromCreateManyFromUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskFromCreateManyFromUserInputSchema),z.lazy(() => TaskFromCreateManyFromUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default TaskFromCreateManyFromUserInputEnvelopeSchema;
