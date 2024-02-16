import { Prisma } from ".prisma/client"
import { userListViewSchema } from "./user.base"
import { paymentListViewSchema } from "@/schema/pay"
import { productInBillListViewSchema } from "@/schema/product-in-bill"
import validator = Prisma.validator
import BillDefaultArgs = Prisma.BillDefaultArgs
import BillGetPayload = Prisma.BillGetPayload

export const billListViewSchema = validator<BillDefaultArgs>()({
  include: {
    user: userListViewSchema,
    payment: paymentListViewSchema,
    products: {
      include: {
        product: productInBillListViewSchema,
      },
    },
  },
})
export type IBillListView = BillGetPayload<typeof billListViewSchema>
