import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { sum } from "lodash"
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

export const BillItem = ({ bill }: { bill: IBillListView }) => (
  <Card key={bill.id}>
    <CardHeader>
      <Link href={`/product/${bill.product.id}`}>
        <CardTitle>{bill.product.title}</CardTitle>
      </Link>
      <CardDescription>{bill.product.description}</CardDescription>
    </CardHeader>

    <CardContent>
      <div>price: {bill.price}</div>
      <div>count: {bill.productCount}</div>
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

export const MyBillsForPC = () => {
  const { data: bills = [] } = api.bill.listMyBills.useQuery()
  const totalRevenue = sum(bills.map((bill) => bill.price * bill.productCount))

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">UserId</TableHead>
          <TableHead>UserName</TableHead>

          <TableHead className="text-right">ProductId</TableHead>
          <TableHead className="text-right">ProductName</TableHead>
          <TableHead className="text-right">ProductPrice</TableHead>
          <TableHead className="text-right">ProductCount</TableHead>

          <TableHead className="text-right">BillDatetime</TableHead>
          <TableHead className="text-right">BillType</TableHead>

          <TableHead className="text-right">CustomerName</TableHead>
          <TableHead className="text-right">CustomerAddress</TableHead>
          <TableHead className="text-right">CustomerPhone</TableHead>
          <TableHead className="text-right">CustomerReservationTime</TableHead>

          <TableHead className="text-right">Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map((bill) => (
          <TableRow key={bill.id}>
            <TableCell className="font-medium">{bill.user.id}</TableCell>
            <TableCell>{bill.user.name}</TableCell>
            <TableCell>{bill.product.id}</TableCell>
            <TableCell className="text-right">{bill.product.title}</TableCell>
            <TableCell className="text-right">{bill.product.price}</TableCell>
            <TableCell className="text-right">{bill.productCount}</TableCell>
            <TableCell className="text-right">
              {bill.createdAt.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">{bill.redeemType}</TableCell>
            <TableCell className="text-right">{"-"}</TableCell>
            <TableCell className="text-right">{"-"}</TableCell>
            <TableCell className="text-right">{"-"}</TableCell>
            <TableCell className="text-right">{"-"}</TableCell>
            <TableCell className="text-right">{"-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Revenue</TableCell>
          <TableCell className="text-right">${totalRevenue}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
