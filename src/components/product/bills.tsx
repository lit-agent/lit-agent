import { api } from "@/lib/trpc/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { TODO } from "@/config"
import { UniversalTabs } from "@/components/_universal/tabs"
import { IBillListView } from "@/schema/bill"
import { getBillValue } from "@/lib/utils"

export const BillItem = ({ bill }: { bill: IBillListView }) => {
  const product = bill.products[0]!.product
  const value = getBillValue(bill)
  if (!product) return "no product in bill"

  return (
    <Card key={bill.id}>
      <CardHeader>
        <Link href={`/product/${product.id}`}>
          <CardTitle>{product.title}</CardTitle>
        </Link>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div>value: {value}</div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => {
            toast.info(TODO)
          }}
        >
          退货
        </Button>
      </CardFooter>
    </Card>
  )
}

export const MyBills = () => {
  const { data: bills = [] } = api.bill.listMyBills.useQuery()

  return (
    <UniversalTabs title={"我的账单"}>
      {bills.map((bill) => (
        <BillItem bill={bill} key={bill.id} />
      ))}
    </UniversalTabs>
  )
}
