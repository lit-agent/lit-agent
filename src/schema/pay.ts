import { userListViewSchema } from "@/schema/user.base"
import { Prisma } from ".prisma/client"
import validator = Prisma.validator
import PaymentDefaultArgs = Prisma.PaymentDefaultArgs
import PaymentGetPayload = Prisma.PaymentGetPayload

export const paymentListViewSchema = validator<PaymentDefaultArgs>()({
  include: {
    user: userListViewSchema,
    // bill: billListViewSchema,
  },
})
export type IPaymentListView = PaymentGetPayload<typeof paymentListViewSchema>
