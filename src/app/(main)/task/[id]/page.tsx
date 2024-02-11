"use client"

import Image from "next/image"
import { LitBrandImage } from "@/lib/assets"
import { RiDoubleQuotesL, RiWechatChannelsLine } from "react-icons/ri"
import { Separator } from "@/components/ui/separator"
import { ComponentProps, useEffect, useRef, useState } from "react"
import { FireValue } from "@/components/_universal/fire-value"
import moment from "@/lib/datetime"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner"
import { api } from "@/lib/trpc/react"
import { cn } from "@/lib/utils"
import { uploadFilesV2 } from "@/lib/oss/upload/client"
import { useAppData } from "@/lib/store/use-app-data"
import { UserTaskStatus } from "@prisma/client"
import Message from "@/components/chat/message-item"
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/user/user-avatar"
import { MarkdownContainer } from "@/providers/containers"
import { ITaskView, IUserTaskView } from "@/schema/task"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useRouter } from "next/navigation"
import UserAvatars from "@/components/user/user-avatars"
import { Label } from "@/components/ui/label"
import { useCountdown } from "@/hooks/use-countdown"
import {
  MSG_SUBMIT_VERIFY_FAILED,
  MSG_SUBMIT_VERIFY_SUCCESS,
  MSG_SUBMIT_VERIFYING,
} from "@/config"

export default function TaskDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data: task } = api.task.get.useQuery({ id })
  const { data: userTask } = api.task.getUserTask.useQuery({
    taskId: id,
  })

  const toTimeInit = task?.endTime
    ? moment(task.endTime).diff(moment(), "s")
    : 0

  const { count: toTime, start } = useCountdown({ startValue: toTimeInit })

  useEffect(() => {
    if (toTimeInit > 0) start()
  }, [toTimeInit])

  return (
    <div className={" h-full flex flex-col overflow-hidden"}>
      <MainArea toTime={toTime} task={task} userTask={userTask} />

      <BottomActions toTime={toTime} task={task} userTask={userTask} />
    </div>
  )
}

const MainArea = ({
  userTask,
  task,
  toTime,
}: {
  toTime: number
  userTask?: IUserTaskView | null
  task?: ITaskView
}) => {
  const user = useUser()

  const { messages } = useAppData()

  const refTop = useRef<HTMLDivElement>(null)

  const deleteTask = api.task.delete.useMutation()
  const router = useRouter()
  const utils = api.useUtils()

  const isAdmin = !!user && !!task && user.id === task.fromUserId

  return (
    <div className={"px-4 -mx-4 grow overflow-auto flex flex-col gap-2"}>
      <div ref={refTop} className={" w-full flex flex-col gap-2 items-center"}>
        <div className={"w-full h-full flex gap-4 justify-start items-start"}>
          <div className={"w-1/3 relative"}>
            <AspectRatio ratio={3 / 4}>
              <Image
                src={task?.images[0] ?? LitBrandImage}
                alt={"cover"}
                priority
                fill
                sizes={"100%"}
                className={"object-cover rounded-lg"}
              />
            </AspectRatio>
          </div>

          <div
            className={
              "grow h-full flex flex-col justify-center items-start gap-2"
            }
          >
            <div className={"w-full flex justify-between items-center"}>
              <RiDoubleQuotesL className={"w-10 h-10 text-gray-500"} />

              {userTask && <VerifyStatus userTask={userTask} />}
            </div>
            <span>{task?.title}</span>

            <div className={"w-full flex justify-between items-center mt-auto"}>
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
                <FireValue value={task?.value} />
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
                      {Math.floor(toTime / 3600)}
                    </span>
                    <span>时</span>
                    <span className={"text-primary font-medium"}>
                      {Math.floor(toTime / 60) % 60}
                    </span>
                    <span>分</span>
                    <span className={"text-primary font-medium"}>
                      {toTime % 60}
                    </span>
                    <span>秒</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Separator orientation={"horizontal"} />

          <div className={"flex flex-col gap-2 items-center"}>
            <div className={"font-semibold text-lg"}>任务描述</div>

            <MarkdownContainer>
              {task?.purpose || "该任务没有任何描述~"}
            </MarkdownContainer>

            <Separator orientation={"horizontal"} />

            <div className={"font-semibold text-lg"}>温馨提示</div>

            <ul className={"text-muted-foreground text-sm "}>
              <li>我们将会在 48h 内审核您提交的任务</li>
              <li>审核通过后，火值将自动归属到您账户</li>
              <li>严禁虚假提交，违者封禁处理！</li>
            </ul>

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

      <div className={"flex flex-col items-center gap-2 my-8"}>
        <UserAvatars users={(task?.toUsers ?? []).map((u) => u.user)} />
        <div>{task?.toUsers.length} 人已参加</div>
      </div>

      {isAdmin && (
        <>
          <Link href={`/task/${task.id}/manage`}>
            <Button className={"w-full"}>点击查看与审核</Button>
          </Link>

          <Button
            variant={"destructive"}
            onClick={() => {
              deleteTask
                .mutateAsync({ id: task.id })
                .then((res) => {
                  console.log("[DeleteTask] res: ", res)
                  toast.success("删除成功！")
                  utils.task.invalidate()
                  router.push("/task")
                })
                .catch((e) => {
                  console.error("[DeleteTask] err: ", e)
                  toast.error("删除失败！")
                })
            }}
          >
            删除任务
          </Button>
        </>
      )}

      {/* todo: group messages */}
      {messages
        .filter(
          (message) => !!task?.room && message.room?.id === task?.room?.id,
        )
        .map((message, index) => (
          // <div key={index}>{JSON.stringify(message.body)}</div>
          <Message user={message.fromUser} body={message.body} key={index} />
        ))}
    </div>
  )
}

const VerifyStatus = ({ userTask }: { userTask: IUserTaskView }) => {
  const TheBadge = ({ className, ...props }: ComponentProps<typeof Badge>) => {
    return <Badge className={cn("w-32", className)} {...props} />
  }

  switch (userTask.passed) {
    case true:
      return <TheBadge>{MSG_SUBMIT_VERIFY_SUCCESS}</TheBadge>
    case false:
      return <TheBadge>{MSG_SUBMIT_VERIFY_FAILED}</TheBadge>
    case null:
      return <TheBadge>{MSG_SUBMIT_VERIFYING}</TheBadge>
    default:
      throw new Error("unexpected")
  }
}

const BottomActions = ({
  task,
  userTask,
  toTime,
}: {
  task?: ITaskView
  userTask?: IUserTaskView | null // 没有也没关系
  toTime: number
}) => {
  const utils = api.useUtils()

  const hasFinished = userTask?.status === UserTaskStatus.finished

  const submitTask = api.task.submitImages.useMutation()

  const [copied, copyFn] = useCopyToClipboard()

  const [open, setOpen] = useState(false)

  return (
    <div className={"flex flex-col w-full shrink-0 space-y-4 pt-4"}>
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

      <Button
        className={"bg-white text-primary hover:bg-white/90"}
        onClick={async () => {
          await copyFn(location.href)
          await toast.success("复制成功！")
        }}
      >
        🔗复制任务链接
      </Button>

      {userTask ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button>去限时群聊</Button>
          </DialogTrigger>

          <DialogContent className={"max-h-[80%] overflow-auto"}>
            <div className={"flex flex-col items-center gap-2"}>
              {!task?.result ? (
                "该任务暂无群聊"
              ) : (
                // todo: support more type of result
                <>
                  <div>欢迎加入限时群聊</div>
                  {task.result.value.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        src={item}
                        alt={"group"}
                        width={240}
                        height={320}
                        className={"h-auto"}
                      />
                    )
                  })}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : toTime <= 0 ? (
        <Button disabled>不好意思，活动已经结束</Button>
      ) : (
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
      )}
    </div>
  )
}
