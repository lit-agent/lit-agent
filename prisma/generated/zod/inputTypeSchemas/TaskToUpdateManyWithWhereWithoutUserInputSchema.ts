import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToScalarWhereInputSchema } from './TaskToScalarWhereInputSchema';
import { TaskToUpdateManyMutationInputSchema } from './TaskToUpdateManyMutationInputSchema';
import { TaskToUncheckedUpdateManyWithoutUserInputSchema } from './TaskToUncheckedUpdateManyWithoutUserInputSchema';

export const TaskToUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TaskToUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TaskToScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskToUpdateManyMutationInputSchema),z.lazy(() => TaskToUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default TaskToUpdateManyWithWhereWithoutUserInputSchema;
