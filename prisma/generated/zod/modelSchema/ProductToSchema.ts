import { z } from 'zod';

/////////////////////////////////////////
// PRODUCT TO SCHEMA
/////////////////////////////////////////

export const ProductToSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fromUserId: z.string(),
  toUserId: z.string(),
  isFavored: z.boolean(),
  inCar: z.number().int(),
  bought: z.number().int(),
})

export type ProductTo = z.infer<typeof ProductToSchema>

export default ProductToSchema;
