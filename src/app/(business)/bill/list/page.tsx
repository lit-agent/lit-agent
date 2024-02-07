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
import { prisma } from "@/lib/db"
import { billListViewSchema } from "@/schema/bill"
import { sum } from "lodash"

export default async function ListBillsPage() {
  const bills = await prisma.bill.findMany({ ...billListViewSchema })
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
            <TableCell className="text-right">{bill.method}</TableCell>
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
