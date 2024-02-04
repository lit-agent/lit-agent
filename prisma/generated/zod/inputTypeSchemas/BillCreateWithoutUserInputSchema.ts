import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateNestedOneWithoutBillsInputSchema } from './ProductFromCreateNestedOneWithoutBillsInputSchema';

export const BillCreateWithoutUserInputSchema: z.ZodType<Prisma.BillCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductFromCreateNestedOneWithoutBillsInputSchema)
}).strict();

export default BillCreateWithoutUserInputSchema;
