import { z } from 'zod';

/////////////////////////////////////////
// PRODUCT FROM SCHEMA
/////////////////////////////////////////

export const ProductFromSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fromUserId: z.string(),
  images: z.string().array(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().nullable(),
  isSelfOperating: z.boolean().nullable(),
  isReturnable: z.boolean().nullable(),
  isReservationRequired: z.boolean().nullable(),
})

export type ProductFrom = z.infer<typeof ProductFromSchema>

export default ProductFromSchema;
