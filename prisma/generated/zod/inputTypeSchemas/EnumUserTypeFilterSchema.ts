import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserTypeSchema } from './UserTypeSchema';
import { NestedEnumUserTypeFilterSchema } from './NestedEnumUserTypeFilterSchema';

export const EnumUserTypeFilterSchema: z.ZodType<Prisma.EnumUserTypeFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.lazy(() => UserTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeFilterSchema) ]).optional(),
}).strict();

export default EnumUserTypeFilterSchema;
