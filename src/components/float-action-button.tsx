import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export const FloatActionButton = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        className={
          "bg-primary rounded-full absolute right-4 bottom-16 w-fit h-fit p-1 text-white"
        }
      >
        <PlusIcon />
      </Button>
    </DialogTrigger>

    <DialogContent>
      <Label>发布</Label>
      <Link href={"/task/create"}>
        <Button className={"w-full"}>发布新任务</Button>
      </Link>

      <Link href={"/product/create"}>
        <Button className={"w-full"}>发布新产品/服务</Button>
      </Link>

      <Label>管理</Label>
      <Link href={"/task/create"}>
        <Button className={"w-full"} disabled>
          管理用户
        </Button>
      </Link>
      <Link href={"/task/create"}>
        <Button className={"w-full"} disabled>
          管理新任务
        </Button>
      </Link>

      <Link href={"/product/create"}>
        <Button className={"w-full"} disabled>
          管理产品/服务
        </Button>
      </Link>
    </DialogContent>
  </Dialog>
)
