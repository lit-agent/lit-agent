import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromUpdateWithoutFromUserInputSchema } from './TaskFromUpdateWithoutFromUserInputSchema';
import { TaskFromUncheckedUpdateWithoutFromUserInputSchema } from './TaskFromUncheckedUpdateWithoutFromUserInputSchema';

export const TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUpdateWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskFromUpdateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutFromUserInputSchema) ]),
}).strict();

export default TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema;
