import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema } from './ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema';

export const BillUpdateWithoutUserInputSchema: z.ZodType<Prisma.BillUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema).optional()
}).strict();

export default BillUpdateWithoutUserInputSchema;
