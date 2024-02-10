import { z } from "zod"
import { Prisma } from ".prisma/client"
import { userListViewSchema } from "@/schema/user.base"
import validator = Prisma.validator
import ProductDefaultArgs = Prisma.ProductDefaultArgs
import ProductGetPayload = Prisma.ProductGetPayload
import UserProductDefaultArgs = Prisma.UserProductDefaultArgs
import UserProductGetPayload = Prisma.UserProductGetPayload

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
    fromUser: userListViewSchema,
    bills: {
      include: {
        user: userListViewSchema,
      },
    },
  },
})
export type IProductListView = ProductGetPayload<typeof productListViewSchema>

export const userProductListViewSchema = validator<UserProductDefaultArgs>()({
  include: {
    user: userListViewSchema,
    product: productListViewSchema,
  },
})
export type IUserProductListView = UserProductGetPayload<
  typeof userProductListViewSchema
>
