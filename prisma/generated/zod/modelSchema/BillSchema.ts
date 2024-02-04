import { z } from 'zod';

/////////////////////////////////////////
// BILL SCHEMA
/////////////////////////////////////////

export const BillSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  productId: z.string(),
})

export type Bill = z.infer<typeof BillSchema>

export default BillSchema;
