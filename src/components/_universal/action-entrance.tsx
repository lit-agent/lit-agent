"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

export const ActionEntrance = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={"bg-primary rounded-full w-fit h-fit p-1 text-white"}
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Label>发布</Label>
        <Link
          href={"/create"}
          onClick={() => {
            setOpen(false)
          }}
        >
          <Button className={"w-full"}>发布任务/产品</Button>
        </Link>

        <Label>管理</Label>
        <Link
          href={"/fans/manage"}
          onClick={() => {
            setOpen(false)
          }}
        >
          <Button className={"w-full"} disabled>
            管理用户
          </Button>
        </Link>

        <Link
          href={"/task/manage"}
          onClick={() => {
            setOpen(false)
          }}
        >
          <Button className={"w-full"} disabled>
            管理任务
          </Button>
        </Link>

        <Link
          href={"/bill/list"}
          onClick={() => {
            setOpen(false)
          }}
        >
          <Button className={"w-full"} disabled>
            管理订单
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}
