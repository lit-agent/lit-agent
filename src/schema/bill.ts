import { Prisma } from ".prisma/client"
import validator = Prisma.validator
import BillDefaultArgs = Prisma.BillDefaultArgs
import BillGetPayload = Prisma.BillGetPayload
import { userViewSchema } from "./user.base"
import { productListViewSchema } from "./product"

export const billListViewSchema = validator<BillDefaultArgs>()({
  include: {
    user: userViewSchema,
    product: productListViewSchema,
  },
})
export type IBillListView = BillGetPayload<typeof billListViewSchema>
