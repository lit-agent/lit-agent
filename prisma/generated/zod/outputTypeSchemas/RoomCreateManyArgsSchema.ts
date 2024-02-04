import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RoomCreateManyInputSchema } from '../inputTypeSchemas/RoomCreateManyInputSchema'

export const RoomCreateManyArgsSchema: z.ZodType<Prisma.RoomCreateManyArgs> = z.object({
  data: z.union([ RoomCreateManyInputSchema,RoomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default RoomCreateManyArgsSchema;
