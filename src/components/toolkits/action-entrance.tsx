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
          href={"/requirement/create"}
          onClick={() => {
            setOpen(false)
          }}
        >
          <Button className={"w-full"}>发布新需求</Button>
        </Link>

        <Link
          href={"/product/create"}
          onClick={() => {
            setOpen(false)
          }}
        >
          <Button className={"w-full"}>发布新产品/服务</Button>
        </Link>

        <Label>管理</Label>
        <Link href={"/fans/manage"}>
          <Button className={"w-full"} disabled>
            管理用户
          </Button>
        </Link>

        <Link href={"/requirement/manage"}>
          <Button className={"w-full"} disabled>
            管理需求
          </Button>
        </Link>

        <Link href={"/product/manage"}>
          <Button className={"w-full"} disabled>
            管理产品/服务
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}
