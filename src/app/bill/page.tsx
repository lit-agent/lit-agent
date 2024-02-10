"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { TODO } from "@/config"
import { api } from "@/lib/trpc/react"

export default function RedeemPage() {
  const { data: bills = [] } = api.bill.listMyBills.useQuery()

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
