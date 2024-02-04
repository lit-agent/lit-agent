import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceWhereUniqueInputSchema } from './TaskChoiceWhereUniqueInputSchema';
import { TaskChoiceUpdateWithoutTaskFromInputSchema } from './TaskChoiceUpdateWithoutTaskFromInputSchema';
import { TaskChoiceUncheckedUpdateWithoutTaskFromInputSchema } from './TaskChoiceUncheckedUpdateWithoutTaskFromInputSchema';
import { TaskChoiceCreateWithoutTaskFromInputSchema } from './TaskChoiceCreateWithoutTaskFromInputSchema';
import { TaskChoiceUncheckedCreateWithoutTaskFromInputSchema } from './TaskChoiceUncheckedCreateWithoutTaskFromInputSchema';

export const TaskChoiceUpsertWithWhereUniqueWithoutTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceUpsertWithWhereUniqueWithoutTaskFromInput> = z.object({
  where: z.lazy(() => TaskChoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskChoiceUpdateWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUncheckedUpdateWithoutTaskFromInputSchema) ]),
  create: z.union([ z.lazy(() => TaskChoiceCreateWithoutTaskFromInputSchema),z.lazy(() => TaskChoiceUncheckedCreateWithoutTaskFromInputSchema) ]),
}).strict();

export default TaskChoiceUpsertWithWhereUniqueWithoutTaskFromInputSchema;
