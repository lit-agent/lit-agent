import { Prisma } from ".prisma/client"
import validator = Prisma.validator
import BillDefaultArgs = Prisma.BillDefaultArgs
import BillGetPayload = Prisma.BillGetPayload
import { userListViewSchema } from "./user.base"
import { productListViewSchema } from "./product"

export const billListViewSchema = validator<BillDefaultArgs>()({
  include: {
    user: userListViewSchema,
    product: productListViewSchema,
  },
})
export type IBillListView = BillGetPayload<typeof billListViewSchema>
