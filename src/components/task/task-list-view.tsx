import { ITaskView } from "@/schema/task"
import { LitBrandImage, TaskCardSVG } from "@/lib/assets"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { api } from "@/lib/trpc/react"
import Link from "next/link"
import UserAvatars from "@/components/user/user-avatars"

export default function TaskListView({ task }: { task: ITaskView }) {
  const { data: userTask } = api.task.getUserTask.useQuery({ taskId: task.id })

  return (
    <div>
      <TaskMain task={task} />

      <div className={"flex items-center justify-between p-2"}>
        <div
          className={"text-muted-foreground text-sm items-center flex gap-1"}
        >
          <UserAvatars users={task.toUsers.map((u) => u.user)} />
          {task.toUsers.length} 人参与
        </div>

        <div className={"flex items-center gap-4"}>
          <Link href={`/task/${task.id}`}>
            <div
              className={
                "gradient-border px-4 py-1 flex items-center justify-center"
              }
            >
              <span className={"gradient-text"}>
                {
                  userTask?.status === "finished" ? "已完成" : "去查看"
                  // 2024-02-11：产品要简化
                  // : userTask?.status === "goon" ? "正在参加" : "立即参加"
                }
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

const TaskMain = ({ task }: { task: ITaskView }) => {
  return (
    <Link className="relative w-full" href={`/task/${task.id}`}>
      <AspectRatio ratio={3.7}>
        <TaskCardSVG />

        <div className="absolute inset-0 flex items-center p-[3%] pr-[10%] gap-[3%] w-full h-full overflow-hidden">
          <div className={"w-[21%] shrink-0 relative h-full"}>
            <Image
              src={task.images[0] ?? LitBrandImage}
              alt={""}
              sizes={"100%"}
              className={"w-full h-full object-cover"}
              fill
            />
          </div>
          <div className="grow p-2 text-black text-xl font-bold">
            {task.title}
          </div>
        </div>
      </AspectRatio>
    </Link>
  )
}
