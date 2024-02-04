import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RoomWhereInputSchema } from './RoomWhereInputSchema';

export const RoomNullableRelationFilterSchema: z.ZodType<Prisma.RoomNullableRelationFilter> = z.object({
  is: z.lazy(() => RoomWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RoomWhereInputSchema).optional().nullable()
}).strict();

export default RoomNullableRelationFilterSchema;
