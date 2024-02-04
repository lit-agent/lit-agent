import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';
import { TaskToUpdateWithoutUserInputSchema } from './TaskToUpdateWithoutUserInputSchema';
import { TaskToUncheckedUpdateWithoutUserInputSchema } from './TaskToUncheckedUpdateWithoutUserInputSchema';

export const TaskToUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TaskToUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskToUpdateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default TaskToUpdateWithWhereUniqueWithoutUserInputSchema;
