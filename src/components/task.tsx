import Link from "next/link"
import { Hot } from "@/components/fire-value"
import Image from "next/image"
import { CoverSmImage, WechatMPIcon } from "@/lib/assets"
import { z } from "zod"
import { api } from "@/lib/trpc/react"
import { createTaskRequirementBodySchema } from "@/schema/task"
import moment from "@/lib/datetime"

export default function RenderTask({ taskId }: { taskId: string }) {
  const { data: task } = api.task.get.useQuery({ id: taskId })
  if (!task) return "loading task..."

  const body = task.body as z.infer<typeof createTaskRequirementBodySchema>

  return (
    <Link
      href={`/fire/${task.id}`}
      className={
        "flex flex-col gap-2 rounded-lg bg-[#3D3847] p-3 cursor-pointer"
      }
    >
      <div className={"flex items-center justify-between"}>
        <div>帮作品传播</div>

        <Hot value={task.value ?? 0} />
      </div>

      <div className={"flex overflow-hidden rounded-lg"}>
        <Image
          src={CoverSmImage}
          alt={"cover"}
          // loading={"lazy"}
          className={"shrink-0 w-[120px] h-auto"}
        />
        <div className={"flex grow flex-col justify-between bg-[#2A2434] p-3"}>
          <div>{body.title}</div>

          <div className={"flex justify-between items-baseline"}>
            <div className={"flex items-center gap-1"}>
              <WechatMPIcon />
              {body.platform}
            </div>
            <div className={"text-muted-foreground text-xs"}>
              {moment(task?.startTime ?? new Date())
                .locale("zh")
                .fromNow()}
              发布
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
