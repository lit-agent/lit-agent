import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),
  images: z.array(z.string()).optional(),
  detail: z.string(),
  price: z.number(),
  isOnsite: z.boolean(),
  isSelfOperating: z.boolean(),
  isReturnable: z.boolean(),
  isReservationRequired: z.boolean(),
  total: z.number(),
  fromUserId: z.string(),
});
