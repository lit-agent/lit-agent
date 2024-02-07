import { z } from "zod"

export const createProductSchema = z.object({
  title: z.string(),
  images: z.array(z.string()).optional(),

  description: z.string(),
  detail: z.string(),
  price: z.number(),
  isOnsite: z.boolean(),
  isSelfOperating: z.boolean(),
  isReturnable: z.boolean(),
  isReservationRequired: z.boolean(),
  total: z.number(),
  fromUserId: z.string(),
})
export type ICreateProduct = z.infer<typeof createProductSchema>
