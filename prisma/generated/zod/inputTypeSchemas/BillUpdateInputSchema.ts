import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutBillsNestedInputSchema } from './UserUpdateOneRequiredWithoutBillsNestedInputSchema';
import { ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema } from './ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema';

export const BillUpdateInputSchema: z.ZodType<Prisma.BillUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBillsNestedInputSchema).optional(),
  product: z.lazy(() => ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema).optional()
}).strict();

export default BillUpdateInputSchema;
