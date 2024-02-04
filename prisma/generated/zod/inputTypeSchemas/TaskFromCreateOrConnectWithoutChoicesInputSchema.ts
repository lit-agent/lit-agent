import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromCreateWithoutChoicesInputSchema } from './TaskFromCreateWithoutChoicesInputSchema';
import { TaskFromUncheckedCreateWithoutChoicesInputSchema } from './TaskFromUncheckedCreateWithoutChoicesInputSchema';

export const TaskFromCreateOrConnectWithoutChoicesInputSchema: z.ZodType<Prisma.TaskFromCreateOrConnectWithoutChoicesInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutChoicesInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutChoicesInputSchema) ]),
}).strict();

export default TaskFromCreateOrConnectWithoutChoicesInputSchema;
