import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromScalarWhereInputSchema } from './TaskFromScalarWhereInputSchema';
import { TaskFromUpdateManyMutationInputSchema } from './TaskFromUpdateManyMutationInputSchema';
import { TaskFromUncheckedUpdateManyWithoutFromUserInputSchema } from './TaskFromUncheckedUpdateManyWithoutFromUserInputSchema';

export const TaskFromUpdateManyWithWhereWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUpdateManyWithWhereWithoutFromUserInput> = z.object({
  where: z.lazy(() => TaskFromScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskFromUpdateManyMutationInputSchema),z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserInputSchema) ]),
}).strict();

export default TaskFromUpdateManyWithWhereWithoutFromUserInputSchema;
