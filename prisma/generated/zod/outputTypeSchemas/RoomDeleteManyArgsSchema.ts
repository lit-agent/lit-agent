import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RoomWhereInputSchema } from '../inputTypeSchemas/RoomWhereInputSchema'

export const RoomDeleteManyArgsSchema: z.ZodType<Prisma.RoomDeleteManyArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
}).strict()

export default RoomDeleteManyArgsSchema;
