import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomWhereUniqueInputSchema } from './RoomWhereUniqueInputSchema';
import { RoomUpdateWithoutUsersInputSchema } from './RoomUpdateWithoutUsersInputSchema';
import { RoomUncheckedUpdateWithoutUsersInputSchema } from './RoomUncheckedUpdateWithoutUsersInputSchema';
import { RoomCreateWithoutUsersInputSchema } from './RoomCreateWithoutUsersInputSchema';
import { RoomUncheckedCreateWithoutUsersInputSchema } from './RoomUncheckedCreateWithoutUsersInputSchema';

export const RoomUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoomUpdateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export default RoomUpsertWithWhereUniqueWithoutUsersInputSchema;
