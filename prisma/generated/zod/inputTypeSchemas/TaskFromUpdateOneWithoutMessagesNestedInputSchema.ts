import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateWithoutMessagesInputSchema } from './TaskFromCreateWithoutMessagesInputSchema';
import { TaskFromUncheckedCreateWithoutMessagesInputSchema } from './TaskFromUncheckedCreateWithoutMessagesInputSchema';
import { TaskFromCreateOrConnectWithoutMessagesInputSchema } from './TaskFromCreateOrConnectWithoutMessagesInputSchema';
import { TaskFromUpsertWithoutMessagesInputSchema } from './TaskFromUpsertWithoutMessagesInputSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromUpdateToOneWithWhereWithoutMessagesInputSchema } from './TaskFromUpdateToOneWithWhereWithoutMessagesInputSchema';
import { TaskFromUpdateWithoutMessagesInputSchema } from './TaskFromUpdateWithoutMessagesInputSchema';
import { TaskFromUncheckedUpdateWithoutMessagesInputSchema } from './TaskFromUncheckedUpdateWithoutMessagesInputSchema';

export const TaskFromUpdateOneWithoutMessagesNestedInputSchema: z.ZodType<Prisma.TaskFromUpdateOneWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutMessagesInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskFromCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => TaskFromUpsertWithoutMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TaskFromWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TaskFromWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TaskFromWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskFromUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => TaskFromUpdateWithoutMessagesInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export default TaskFromUpdateOneWithoutMessagesNestedInputSchema;
