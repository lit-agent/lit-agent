import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateWithoutChoicesInputSchema } from './TaskFromCreateWithoutChoicesInputSchema';
import { TaskFromUncheckedCreateWithoutChoicesInputSchema } from './TaskFromUncheckedCreateWithoutChoicesInputSchema';
import { TaskFromCreateOrConnectWithoutChoicesInputSchema } from './TaskFromCreateOrConnectWithoutChoicesInputSchema';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';

export const TaskFromCreateNestedOneWithoutChoicesInputSchema: z.ZodType<Prisma.TaskFromCreateNestedOneWithoutChoicesInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutChoicesInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskFromCreateOrConnectWithoutChoicesInputSchema).optional(),
  connect: z.lazy(() => TaskFromWhereUniqueInputSchema).optional()
}).strict();

export default TaskFromCreateNestedOneWithoutChoicesInputSchema;
