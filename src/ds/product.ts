import { z } from "zod"
import { Prisma } from ".prisma/client"
import validator = Prisma.validator
import ProductFromDefaultArgs = Prisma.ProductFromDefaultArgs
import ProductFromGetPayload = Prisma.ProductFromGetPayload

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

export const productListViewSchema = validator<ProductFromDefaultArgs>()({
  include: {
    fromUser: true,
    toUsers: true,
  },
})
export type IProductListView = ProductFromGetPayload<
  typeof productListViewSchema
>
