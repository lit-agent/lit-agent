import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomScalarWhereInputSchema } from './RoomScalarWhereInputSchema';
import { RoomUpdateManyMutationInputSchema } from './RoomUpdateManyMutationInputSchema';
import { RoomUncheckedUpdateManyWithoutUsersInputSchema } from './RoomUncheckedUpdateManyWithoutUsersInputSchema';

export const RoomUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoomUpdateManyMutationInputSchema),z.lazy(() => RoomUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export default RoomUpdateManyWithWhereWithoutUsersInputSchema;
