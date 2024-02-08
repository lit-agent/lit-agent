import { prisma } from "@/lib/db"
import { ensureServerUser } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { billListViewSchema } from "@/schema/bill"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { TODO } from "@/config"

export default async function RedeemPage() {
  const user = await ensureServerUser()
  const bills = await prisma.bill.findMany({
    where: { userId: user.id },
    ...billListViewSchema,
  })
  return (
    <div className={"flex flex-col gap-2 p-4"}>
      {bills.map((bill, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{bill.product.title}</CardTitle>
            <CardDescription>{bill.id}</CardDescription>
          </CardHeader>

          <CardContent>
            <div>price: {bill.price}</div>
            <div>count: {bill.productCount}</div>
          </CardContent>

          <CardFooter>
            <Button variant={"outline"} onClick={() => toast.info(TODO)}>
              退货
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
