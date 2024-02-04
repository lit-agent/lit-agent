import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceScalarWhereInputSchema } from './TaskChoiceScalarWhereInputSchema';
import { TaskChoiceUpdateManyMutationInputSchema } from './TaskChoiceUpdateManyMutationInputSchema';
import { TaskChoiceUncheckedUpdateManyWithoutTaskFromInputSchema } from './TaskChoiceUncheckedUpdateManyWithoutTaskFromInputSchema';

export const TaskChoiceUpdateManyWithWhereWithoutTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceUpdateManyWithWhereWithoutTaskFromInput> = z.object({
  where: z.lazy(() => TaskChoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskChoiceUpdateManyMutationInputSchema),z.lazy(() => TaskChoiceUncheckedUpdateManyWithoutTaskFromInputSchema) ]),
}).strict();

export default TaskChoiceUpdateManyWithWhereWithoutTaskFromInputSchema;
