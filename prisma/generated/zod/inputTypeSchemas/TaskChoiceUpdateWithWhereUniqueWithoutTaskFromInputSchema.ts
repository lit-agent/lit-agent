import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceWhereUniqueInputSchema } from './TaskChoiceWhereUniqueInputSchema';
import { TaskChoiceUpdateWithoutTaskFromInputSchema } from './TaskChoiceUpdateWithoutTaskFromInputSchema';
import { TaskChoiceUncheckedUpdateWithoutTaskFromInputSchema } from './TaskChoiceUncheckedUpdateWithoutTaskFromInputSchema';

export const TaskChoiceUpdateWithWhereUniqueWithoutTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceUpdateWithWhereUniqueWithoutTaskFromInput> = z.object({
  where: z.lazy(() => TaskChoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskChoiceUpdateWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUncheckedUpdateWithoutTaskFromInputSchema) ]),
}).strict();

export default TaskChoiceUpdateWithWhereUniqueWithoutTaskFromInputSchema;
