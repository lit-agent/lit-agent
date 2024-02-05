import { z } from "zod"

export const createProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  images: z.array(z.string()).optional(),
  price: z.number(),
  isOnsite: z.boolean(),
  isSelfOperating: z.boolean(),
  isReturnable: z.boolean(),
  isReservationRequired: z.boolean(),
  total: z.number(),
  fromUserId: z.string(),
})
