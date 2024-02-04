import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';
import { TaskToUpdateWithoutTaskInputSchema } from './TaskToUpdateWithoutTaskInputSchema';
import { TaskToUncheckedUpdateWithoutTaskInputSchema } from './TaskToUncheckedUpdateWithoutTaskInputSchema';
import { TaskToCreateWithoutTaskInputSchema } from './TaskToCreateWithoutTaskInputSchema';
import { TaskToUncheckedCreateWithoutTaskInputSchema } from './TaskToUncheckedCreateWithoutTaskInputSchema';

export const TaskToUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskToUpdateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export default TaskToUpsertWithWhereUniqueWithoutTaskInputSchema;
