import { userListViewSchema } from "@/schema/user.base"
import { billListViewSchema } from "@/schema/bill"
import { Prisma } from ".prisma/client"
import validator = Prisma.validator
import PaymentDefaultArgs = Prisma.PaymentDefaultArgs
import PaymentGetPayload = Prisma.PaymentGetPayload

export const paymentDetailViewSchema = validator<PaymentDefaultArgs>()({
  include: {
    user: userListViewSchema,
    bill: billListViewSchema,
  },
})
export type IPaymentDetailView = PaymentGetPayload<
  typeof paymentDetailViewSchema
>
