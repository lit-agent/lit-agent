import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateWithoutChoicesInputSchema } from './TaskFromCreateWithoutChoicesInputSchema';
import { TaskFromUncheckedCreateWithoutChoicesInputSchema } from './TaskFromUncheckedCreateWithoutChoicesInputSchema';
import { TaskFromCreateOrConnectWithoutChoicesInputSchema } from './TaskFromCreateOrConnectWithoutChoicesInputSchema';
import { TaskFromUpsertWithoutChoicesInputSchema } from './TaskFromUpsertWithoutChoicesInputSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';
import { TaskFromUpdateToOneWithWhereWithoutChoicesInputSchema } from './TaskFromUpdateToOneWithWhereWithoutChoicesInputSchema';
import { TaskFromUpdateWithoutChoicesInputSchema } from './TaskFromUpdateWithoutChoicesInputSchema';
import { TaskFromUncheckedUpdateWithoutChoicesInputSchema } from './TaskFromUncheckedUpdateWithoutChoicesInputSchema';

export const TaskFromUpdateOneWithoutChoicesNestedInputSchema: z.ZodType<Prisma.TaskFromUpdateOneWithoutChoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutChoicesInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskFromCreateOrConnectWithoutChoicesInputSchema).optional(),
  upsert: z.lazy(() => TaskFromUpsertWithoutChoicesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TaskFromWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TaskFromWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TaskFromWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskFromUpdateToOneWithWhereWithoutChoicesInputSchema),z.lazy(() => TaskFromUpdateWithoutChoicesInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutChoicesInputSchema) ]).optional(),
}).strict();

export default TaskFromUpdateOneWithoutChoicesNestedInputSchema;
