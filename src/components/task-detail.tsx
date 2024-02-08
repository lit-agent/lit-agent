"use client"

import Image from "next/image"
import { BroadcastImage } from "@/lib/assets"
import { RiDoubleQuotesL, RiWechatChannelsLine } from "react-icons/ri"
import { Separator } from "@/components/ui/separator"
import { useRef } from "react"
import { IUserMainView } from "@/schema/user"
import { Hot } from "@/components/fire-value"
import { MyMarkdown } from "@/components/markdown"
import { UserAvatar } from "@/components/user-avatar"
import moment from "@/lib/datetime"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner"
import { api } from "@/lib/trpc/react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { uploadFiles } from "@/lib/oss/upload/client"
import { useAppData } from "@/lib/store/use-app-data"
import { ICreateTaskRequirementBody } from "@/schema/task"
import { UserTaskStatus } from "@prisma/client"
import Message from "@/components/message-item"

export default function TaskDetailPage({
  user,
  taskId,
}: {
  user: IUserMainView
  taskId: string
}) {
  const refTop = useRef<HTMLDivElement>(null)
  const { targetUserId } = useAppData()

  const utils = api.useUtils()
  const { data: task } = api.task.get.useQuery({ id: taskId })
  const { data: userTask } = api.task.getUserTask.useQuery({
    taskId,
  })
  const hasFinished = userTask?.status === UserTaskStatus.finished

  const submitTask = api.task.submitImages.useMutation()

  const { messages } = useAppData()

  if (!task) return "loading task..."

  const body = task.body as ICreateTaskRequirementBody

  return (
    <div className={"px-8 py-4 h-full flex flex-col overflow-hidden"}>
      <div className={"grow overflow-auto"}>
        <div
          ref={refTop}
          className={" w-full pb-2  flex flex-col gap-2 items-center h-[240px]"}
        >
          <div className={"w-full h-full flex gap-4 justify-start items-start"}>
            <Image
              src={BroadcastImage}
              alt={"broadcast"}
              priority
              className={"shrink-0 z-0 relative w-40 h-auto"}
            />

            <div
              className={
                "grow h-full flex flex-col justify-center items-start gap-2"
              }
            >
              <RiDoubleQuotesL className={"w-10 h-10 text-gray-500"} />
              <span>{body.title}</span>

              <div
                className={"w-full flex justify-between items-center mt-auto"}
              >
                <div className={"font-medium items-center flex gap-1"}>
                  <RiWechatChannelsLine
                    className={"text-primary bg-white rounded"}
                  />
                  {body.platform}
                </div>

                <div className={"text-muted-foreground text-xs"}>
                  {moment(task.startTime).fromNow()}发布
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={"w-full z-1 relative"}
          style={
            {
              // top: refTop.current?.getBoundingClientRect().height,
              // left: 0
            }
          }
        >
          <div className={"bg-[#3D3847] rounded-3xl flex flex-col gap-4 p-4"}>
            <div className={"grid grid-cols-2"}>
              <div className={"flex flex-col items-center"}>
                <div>任务奖励</div>
                <div>
                  <Hot value={task.value} />
                </div>
              </div>

              <div className={"flex flex-col items-center"}>
                <div>任务时限</div>
                <div>
                  <span className={"text-primary font-medium"}>{23}</span>
                  <span>时</span>
                  <span className={"text-primary font-medium"}>{47}</span>
                  <span>分</span>
                </div>
              </div>
            </div>

            <Separator orientation={"horizontal"} />

            <div className={"flex flex-col items-center"}>
              <div className={"font-semibold"}>任务目的</div>

              <MyMarkdown>{body.purpose}</MyMarkdown>

              <Separator orientation={"horizontal"} />

              <div
                className={
                  "w-full flex items-center justify-between my-4 text-[#B0AFB4] px-2 "
                }
              >
                <div>to {body.targetUsers}</div>
                <div className={"inline-flex items-center gap-1"}>
                  <UserAvatar user={user} size={"sm"} />
                  {user.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"flex flex-col items-center my-8"}>
          <div>{task.toUsers.length} 人已参加</div>
          <div className={"flex gap-2 flex-wrap"}>
            {task.toUsers.map((userTask, index) => (
              <UserAvatar user={userTask.user} key={index} />
            ))}
          </div>
        </div>

        {messages
          .filter((message) => message.room?.id === task.room?.id)
          .map((message, index) => (
            // <div key={index}>{JSON.stringify(message.body)}</div>
            <Message user={message.fromUser} body={message.body} key={index} />
          ))}
      </div>

      {!hasFinished && (
        <div className={"flex flex-col w-full shrink-0 space-y-4 pt-4"}>
          <Button
            className={"bg-white text-primary hover:bg-white/90"}
            onClick={async (event) => {
              const url = location.href
              try {
                await navigator.clipboard.writeText(url)
                toast.success("链接已拷贝：" + url)
              } catch (error) {
                toast.error("Failed to copy!" + error, { duration: 3000 })
              }
            }}
          >
            🔗复制作品链接
          </Button>

          <Label
            className={cn(
              buttonVariants(),
              "bg-primary text-white cursor-pointer",
            )}
          >
            上传截图，赚🔥火值
            <input
              hidden
              type={"file"}
              accept={"image/*"}
              multiple
              onChange={async (event) => {
                if (!targetUserId) throw Error
                const files = event.currentTarget.files
                if (!files) return
                const result = await uploadFiles(files)
                if (!result.success) return

                submitTask
                  .mutateAsync({
                    taskId: task.id,
                    images: result.data as string[],
                  })
                  .catch((e) => {
                    console.error(e)
                    toast.error("执行任务失败！")
                  })
                  .then((res) => {
                    toast.success("执行任务成功！")
                    // 刷新最新的状态，因为后台已经更新了
                    // invalidate: 1. task.get 2. task.getUserTask
                    utils.task.invalidate()
                  })
              }}
            />
          </Label>
        </div>
      )}
    </div>
  )
}
