import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutBillsInputSchema } from './UserCreateNestedOneWithoutBillsInputSchema';
import { ProductFromCreateNestedOneWithoutBillsInputSchema } from './ProductFromCreateNestedOneWithoutBillsInputSchema';

export const BillCreateInputSchema: z.ZodType<Prisma.BillCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBillsInputSchema),
  product: z.lazy(() => ProductFromCreateNestedOneWithoutBillsInputSchema)
}).strict();

export default BillCreateInputSchema;
