import { z } from "zod"
import { Prisma } from ".prisma/client"
import validator = Prisma.validator
import ProductDefaultArgs = Prisma.ProductDefaultArgs
import ProductGetPayload = Prisma.ProductGetPayload

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
})
export type ICreateProduct = z.infer<typeof createProductSchema>

export const productListViewSchema = validator<ProductDefaultArgs>()({
  include: {
    fromUser: true,
    bills: {
      select: {
        userId: true,
      },
    },
  },
})
export type IProductListView = ProductGetPayload<typeof productListViewSchema>
