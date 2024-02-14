"use client"

import SubPage from "@/components/sub-page"
import { api } from "@/lib/trpc/react"
import { BillItem } from "@/components/product/bills"

export default function MyBillsPage() {
  const { data: myBills = [] } = api.bill.listMyBills.useQuery()

  return (
    <SubPage title={"我的账单"}>
      {myBills.map((bill) => (
        <BillItem bill={bill} key={bill.id} />
      ))}
    </SubPage>
  )
}
