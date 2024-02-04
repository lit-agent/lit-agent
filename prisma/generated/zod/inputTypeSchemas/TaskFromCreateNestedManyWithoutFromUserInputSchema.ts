import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromCreateWithoutFromUserInputSchema } from './TaskFromCreateWithoutFromUserInputSchema';
import { TaskFromUncheckedCreateWithoutFromUserInputSchema } from './TaskFromUncheckedCreateWithoutFromUserInputSchema';
import { TaskFromCreateOrConnectWithoutFromUserInputSchema } from './TaskFromCreateOrConnectWithoutFromUserInputSchema';
import { TaskFromCreateManyFromUserInputEnvelopeSchema } from './TaskFromCreateManyFromUserInputEnvelopeSchema';
import { TaskFromWhereUniqueInputSchema } from './TaskFromWhereUniqueInputSchema';

export const TaskFromCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskFromCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TaskFromCreateNestedManyWithoutFromUserInputSchema;
