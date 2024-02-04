import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateWithoutMessagesInputSchema } from './TaskFromCreateWithoutMessagesInputSchema';
import { TaskFromUncheckedCreateWithoutMessagesInputSchema } from './TaskFromUncheckedCreateWithoutMessagesInputSchema';
import { TaskFromCreateOrConnectWithoutMessagesInputSchema } from './TaskFromCreateOrConnectWithoutMessagesInputSchema';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';

export const TaskFromCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.TaskFromCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutMessagesInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskFromCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => TaskFromWhereUniqueInputSchema).optional()
}).strict();

export default TaskFromCreateNestedOneWithoutMessagesInputSchema;
