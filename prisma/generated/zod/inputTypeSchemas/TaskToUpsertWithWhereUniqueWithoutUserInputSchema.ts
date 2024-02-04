import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToWhereUniqueInputSchema } from './TaskToWhereUniqueInputSchema';
import { TaskToUpdateWithoutUserInputSchema } from './TaskToUpdateWithoutUserInputSchema';
import { TaskToUncheckedUpdateWithoutUserInputSchema } from './TaskToUncheckedUpdateWithoutUserInputSchema';
import { TaskToCreateWithoutUserInputSchema } from './TaskToCreateWithoutUserInputSchema';
import { TaskToUncheckedCreateWithoutUserInputSchema } from './TaskToUncheckedCreateWithoutUserInputSchema';

export const TaskToUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TaskToUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskToUpdateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default TaskToUpsertWithWhereUniqueWithoutUserInputSchema;
