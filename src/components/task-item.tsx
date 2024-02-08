import { ITaskView } from "@/schema/task"
import { BrandImage, TaskCardSVG } from "@/lib/assets"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { DeleteIcon } from "lucide-react"
import { toast } from "sonner"
import { api } from "@/lib/trpc/react"
import { useUser } from "@/hooks/use-user"
import Link from "next/link"

export default function TaskItem({ task }: { task: ITaskView }) {
  const utils = api.useUtils()
  const deleteTask = api.task.delete.useMutation()
  const user = useUser()

  return (
    <div>
      <div className="relative w-full">
        <AspectRatio ratio={3.7}>
          <TaskCardSVG />

          <div className="absolute inset-0 flex items-center p-[3%] pr-[10%] gap-[3%] w-full h-full overflow-hidden">
            <div className={"w-[21%] shrink-0 relative h-full"}>
              <Image
                src={task.images[0] ?? BrandImage}
                alt={""}
                className={"w-full h-full"}
                fill
              />
            </div>
            <div className="grow p-2 text-black text-xl font-bold">
              {task.title}
            </div>
          </div>
        </AspectRatio>
      </div>

      <div className={"flex items-center justify-between p-2"}>
        <div className={"text-muted-foreground text-sm"}>
          {task.toUsers.length} 人参与
        </div>

        <div className={"flex items-center gap-4"}>
          {
            // 发布的人才可以删除
            task.fromUserId === user?.id && (
              <Button
                variant={"ghost"}
                className={"text-muted-foreground"}
                onClick={() =>
                  deleteTask
                    .mutateAsync({ id: task.id })
                    .then((res) => {
                      toast.success("删除成功")
                      utils.task.invalidate()
                    })
                    .catch((e) => {
                      toast.error("删除失败")
                    })
                }
              >
                <DeleteIcon />
              </Button>
            )
          }

          <Link href={`/task/${task.id}`}>
            <div
              className={
                "gradient-border px-4 py-1 flex items-center justify-center"
              }
            >
              <span className={"gradient-text"}>立即参加</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
