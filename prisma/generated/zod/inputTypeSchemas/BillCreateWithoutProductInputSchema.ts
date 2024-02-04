import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutBillsInputSchema } from './UserCreateNestedOneWithoutBillsInputSchema';

export const BillCreateWithoutProductInputSchema: z.ZodType<Prisma.BillCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBillsInputSchema)
}).strict();

export default BillCreateWithoutProductInputSchema;
