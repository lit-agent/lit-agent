import { Prisma } from ".prisma/client"
import validator = Prisma.validator
import ProductInBillDefaultArgs = Prisma.ProductInBillDefaultArgs
import ProductInBillGetPayload = Prisma.ProductInBillGetPayload

export const productInBillListViewSchema =
  validator<ProductInBillDefaultArgs>()({
    include: {
      // product: productListViewSchema,
      // bill: billListViewSchema
    },
  })
export type IProductInBillListView = ProductInBillGetPayload<
  typeof productInBillListViewSchema
>
