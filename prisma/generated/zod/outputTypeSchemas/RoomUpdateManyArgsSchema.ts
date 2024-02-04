import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RoomUpdateManyMutationInputSchema } from '../inputTypeSchemas/RoomUpdateManyMutationInputSchema'
import { RoomUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/RoomUncheckedUpdateManyInputSchema'
import { RoomWhereInputSchema } from '../inputTypeSchemas/RoomWhereInputSchema'

export const RoomUpdateManyArgsSchema: z.ZodType<Prisma.RoomUpdateManyArgs> = z.object({
  data: z.union([ RoomUpdateManyMutationInputSchema,RoomUncheckedUpdateManyInputSchema ]),
  where: RoomWhereInputSchema.optional(),
}).strict()

export default RoomUpdateManyArgsSchema;
