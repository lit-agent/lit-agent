import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromUpdateWithoutFromUserInputSchema } from './TaskFromUpdateWithoutFromUserInputSchema';
import { TaskFromUncheckedUpdateWithoutFromUserInputSchema } from './TaskFromUncheckedUpdateWithoutFromUserInputSchema';
import { TaskFromCreateWithoutFromUserInputSchema } from './TaskFromCreateWithoutFromUserInputSchema';
import { TaskFromUncheckedCreateWithoutFromUserInputSchema } from './TaskFromUncheckedCreateWithoutFromUserInputSchema';

export const TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUpsertWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskFromUpdateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutFromUserInputSchema) ]),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export default TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema;
