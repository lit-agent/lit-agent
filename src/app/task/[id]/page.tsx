"use client"

import Image from "next/image"
import { BroadcastImage } from "@/lib/assets"
import { RiDoubleQuotesL, RiWechatChannelsLine } from "react-icons/ri"
import { Separator } from "@/components/ui/separator"
import { useRef, useState } from "react"
import { Hot } from "@/components/fire-value"
import { MyMarkdown } from "@/components/markdown"
import { UserAvatar } from "@/components/user-avatar"
import moment from "@/lib/datetime"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner"
import { api } from "@/lib/trpc/react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { uploadFilesV2 } from "@/lib/oss/upload/client"
import { useAppData } from "@/lib/store/use-app-data"
import { UserTaskStatus } from "@prisma/client"
import Message from "@/components/message-item"
import { useUser } from "@/hooks/use-user"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function TaskDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = useUser()

  const refTop = useRef<HTMLDivElement>(null)

  const utils = api.useUtils()
  const { data: task } = api.task.get.useQuery({ id })
  const { data: userTask } = api.task.getUserTask.useQuery({
    taskId: id,
  })
  const hasFinished = userTask?.status === UserTaskStatus.finished

  const submitTask = api.task.submitImages.useMutation()

  const { messages } = useAppData()

  const [copied, copyFn] = useCopyToClipboard()

  const [open, setOpen] = useState(false)

  // if (hasFinished && user && task) return <TaskOk user={user} task={task} />

  const toTime = task?.endTime
    ? moment(task.endTime).diff(moment(), "minutes")
    : 0

  return (
    <div className={"px-8 py-4 h-full flex flex-col overflow-hidden"}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {/*<AlertDialogTrigger>Open</AlertDialogTrigger>*/}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>任务结果</AlertDialogTitle>
            <AlertDialogDescription>
              提交成功，请耐心等待48H内审核通过后火值发放！
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/*<AlertDialogCancel>Cancel</AlertDialogCancel>*/}
            <AlertDialogAction>确认</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
              <span>{task?.title}</span>

              <div
                className={"w-full flex justify-between items-center mt-auto"}
              >
                <div className={"font-medium items-center flex gap-1"}>
                  <RiWechatChannelsLine
                    className={"text-primary bg-white rounded"}
                  />
                  {task?.platform}
                </div>

                <div className={"text-muted-foreground text-xs"}>
                  {moment(task?.startTime).fromNow()}发布
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
                  <Hot value={task?.value} />
                </div>
              </div>

              <div className={"flex flex-col items-center"}>
                <div>任务时限</div>
                <div className={"flex gap-1 text-muted-foreground"}>
                  {toTime < 0 ? (
                    "已过期"
                  ) : (
                    <>
                      <span className={"text-primary font-medium"}>
                        {Math.floor(toTime / 60)}
                      </span>
                      <span>时</span>
                      <span className={"text-primary font-medium"}>
                        {toTime % 60}
                      </span>
                      <span>分</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Separator orientation={"horizontal"} />

            <div className={"flex flex-col gap-2 items-center"}>
              <div className={"font-semibold text-lg"}>任务描述</div>

              <MyMarkdown>{task?.purpose || "该任务没有任何描述~"}</MyMarkdown>

              <div
                className={"text-muted-foreground text-sm text-center w-1/2"}
              >
                注意：提交后，我们会在48H内审核并发放对应火值，若多次虚假提交，我们可能会采取对应的封禁措施。
              </div>

              <Separator orientation={"horizontal"} />

              <div
                className={
                  "w-full flex items-center justify-between my-4 text-[#B0AFB4] px-2 "
                }
              >
                <div>to {task?.target}</div>
                {user && (
                  <div className={"inline-flex items-center gap-1"}>
                    <UserAvatar user={user} size={"sm"} />
                    {user.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={"flex flex-col items-center my-8"}>
          <div>{task?.toUsers.length} 人已参加</div>
          <div className={"flex gap-2 flex-wrap"}>
            {task?.toUsers.map((userTask, index) => (
              <UserAvatar user={userTask.user} key={index} />
            ))}
          </div>
        </div>

        {messages
          .filter(
            (message) => !!task?.room && message.room?.id === task?.room?.id,
          )
          .map((message, index) => (
            // <div key={index}>{JSON.stringify(message.body)}</div>
            <Message user={message.fromUser} body={message.body} key={index} />
          ))}
      </div>

      {!hasFinished && (
        <div className={"flex flex-col w-full shrink-0 space-y-4 pt-4"}>
          <Button
            disabled={toTime <= 0}
            className={"bg-white text-primary hover:bg-white/90"}
            onClick={async () => {
              await copyFn(location.href)
              await toast.success("复制成功！")
            }}
          >
            🔗复制任务链接
          </Button>

          {!hasFinished ? (
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
                  if (!task) return
                  const files = event.currentTarget.files

                  if (!files) return
                  const result = await uploadFilesV2(files)

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
                      setOpen(true)
                      // toast.success("执行任务成功！")
                      // 刷新最新的状态，因为后台已经更新了
                      // invalidate: 1. task.get 2. task.getUserTask
                      utils.task.invalidate()
                    })
                }}
              />
            </Label>
          ) : (
            <Button onClick={() => {}}>去限时群聊</Button>
          )}
        </div>
      )}
    </div>
  )
}

const useTaskDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/*<AlertDialogTrigger>Open</AlertDialogTrigger>*/}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>任务结果</AlertDialogTitle>
          <AlertDialogDescription>
            提交成功，请耐心等待48H内审核通过后火值发放！
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/*<AlertDialogCancel>Cancel</AlertDialogCancel>*/}
          <AlertDialogAction>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
