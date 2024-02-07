import Link from "next/link"
import { Hot } from "@/components/toolkits/fire-value"
import Image from "next/image"
import { CoverSmImage, WechatMPIcon } from "@/lib/assets"
import moment from "moment/moment"
import { z } from "zod"
import { api } from "@/lib/trpc/react"
import { createTaskRequirementBodySchema } from "@/ds/task"

export default function RenderTask({ fireId }: { fireId: string }) {
  const { data: fire } = api.task.get.useQuery({ id: fireId })
  if (!fire) return "loading task..."

  const body = fire.body as z.infer<typeof createTaskRequirementBodySchema>

  return (
    <Link
      href={`/fire/${fire.id}`}
      className={
        "flex flex-col gap-2 rounded-lg bg-[#3D3847] p-3 cursor-pointer"
      }
    >
      <div className={"flex items-center justify-between"}>
        <div>帮作品传播</div>

        <Hot value={fire.value ?? 0} />
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
              {moment(fire?.startTime ?? new Date())
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
