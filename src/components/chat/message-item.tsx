"use client"

import { BsThreeDots } from "react-icons/bs"
import { IMessageView, MessageType } from "@/schema/message.base"
import { cn } from "@/lib/utils"
import { HTMLAttributes, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { IMessageBody } from "@/schema/message"

import RenderTask from "@/components/task/task-message"
import { IUserAvatar, IUserListView } from "@/schema/user.base"
import { ChevronRightIcon } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

import { getImagePath } from "@/lib/oss/read/helpers"
import { UserType } from "@prisma/client"

import { UserAvatar } from "@/components/user/user-avatar"
import { BloggerContainer } from "@/components/user/blogger-container"
import { MarkdownContainer } from "@/providers/containers"
import { DEFAULT_USERNAME } from "@/config"

export interface IMessageContainer {
  user: IUserAvatar
  body: IMessageBody
  taskId?: string
  onValueChange?: (v: any) => void
  isAI?: boolean
  message?: IMessageView
}

export default function Message({
  user,
  body,
  taskId,
  onValueChange,
  message,
}: IMessageContainer) {
  return (
    <MessageContainer user={user} message={message}>
      <MessageBody body={body} taskId={taskId} onValueChange={onValueChange} />
    </MessageContainer>
  )
}

export const MessageContainer = ({
  message,
  user,
  className,
  children,
  ...props
}: {
  user?: IUserAvatar
  message?: IMessageView
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("relative flex gap-2 p-2", className)} {...props}>
      {user?.type === UserType.blogger ? (
        <BloggerContainer className={"flex items-start"}>
          <UserAvatar user={user} />
        </BloggerContainer>
      ) : (
        <UserAvatar user={user} />
      )}

      <div className={"grow overflow-hidden flex flex-col gap-2"}>
        <div className={"flex items-center gap-1 text-xs text-gray-400"}>
          <span>{user?.name ?? DEFAULT_USERNAME}</span>

          {user?.type === "blogger" && (
            <Badge
              className={"rounded-sm bg-green-800 px-1 py-0 text-gray-200"}
            >
              博主
            </Badge>
          )}

          {message?.isAI && (
            <Badge className={"rounded-sm bg-blue-800 px-1 py-0 text-gray-200"}>
              AI
            </Badge>
          )}
        </div>

        {children}
      </div>

      {user?.type === "assistant" && (
        <BsThreeDots className={cn("text-muted-foreground absolute right-2")} />
      )}
    </div>
  )
}

export const getMessageAbstract = ({ body }: { body: IMessageBody }) => {
  switch (body.type) {
    case "Plain":
      return body.title

    case "Images":
      return `[图片] (${body.images.length}张)`

    case "BillLink":
      return `[订单] id: ${body.value}`

    case "GroupLink":
    case "ImageChoices":
    case "Others":
    case "ProductLink":
    case "Sheet":
    case "TextChoices":
    case "Task":
    default:
      return JSON.stringify(body)
  }
}

export const MessageBody = ({
  body,
  taskId,
  onValueChange,
}: {
  body: IMessageBody
  taskId?: string
  onValueChange?: (v: any) => void
}) => {
  const [checks, setChecks] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)

  switch (body.type) {
    case MessageType.Plain:
      return <MarkdownContainer>{body.title ?? ""}</MarkdownContainer>

    case MessageType.TextChoices:
      return (
        <div className={"flex w-full flex-col gap-2"}>
          {body.title && <MarkdownContainer>{body.title}</MarkdownContainer>}

          {body.choices.map(({ value }, index) => (
            <Label
              className={cn(
                "flex items-center gap-2 py-1 hover:bg-primary/25 rounded",
                !checks.includes(index) && "brightness-50",
              )}
              key={index}
            >
              <Checkbox
                value={`${index}`}
                checked={checks.includes(index)}
                disabled={submitted}
                onCheckedChange={(checked) => {
                  const newChecks = !body.multiple
                    ? // 单选
                      [index]
                    : // 多选
                      checked
                      ? [...checks, index].sort()
                      : checks.filter((c) => c !== index)

                  onValueChange && onValueChange(newChecks)
                  setChecks(newChecks)
                }}
              />

              <span>{value}</span>
            </Label>
          ))}
        </div>
      )

    case MessageType.Images:
      return (
        <div>
          <div>上传了作品截图</div>
          <div
            className={
              "bg-[#3D3847] p-4 rounded flex items-center justify-between"
            }
          >
            <div className={"flex items-center gap-4"}>
              {body.images.map((s, index) => (
                <div className={"w-16"} key={index}>
                  <AspectRatio ratio={1}>
                    <Image
                      src={getImagePath(s, { width: 64, height: 64 })}
                      alt={s}
                      fill
                      sizes={"100%"}
                      className={"rounded-lg object-cover"}
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>

            <ChevronRightIcon className={"text-muted-foreground"} />
          </div>
        </div>
      )

    case MessageType.Task:
      return taskId ? <RenderTask taskId={taskId} /> : "no task id"

    case MessageType.GroupLink:
    // return (
    //   <div className={"flex flex-col gap-1 rounded-lg bg-[#3D3847] p-3"}>
    //     <div className={"flex items-center justify-between"}>
    //       <div className={"flex items-center gap-1"}>
    //         <NotificationIcon />
    //         邀你加入限时群聊
    //       </div>
    //       <ArrowRightIcon />
    //     </div>
    //
    //     <div className={"flex items-center justify-between"}>
    //       <div className={"flex -space-x-4"}>
    //         {body.memberAvatars?.slice(0, 6).map((avatar, index: number) => (
    //           <Avatar key={index}>
    //             <AvatarImage src={avatar} />
    //           </Avatar>
    //         ))}
    //       </div>
    //
    //       <div>{body.membersCount}人已加入</div>
    //     </div>
    //   </div>
    // );

    case MessageType.ImageChoices:
    // return (
    //   <div className={"flex flex-col gap-2"}>
    //     <RadioGroup
    //       className={"flex gap-2"}
    //       value={imageIndex}
    //       onValueChange={setImageIndex}
    //     >
    //       {body.questions.map((image, index) => (
    //         <div
    //           className={cn(
    //             "flex flex-col items-center gap-2",
    //             `${index}` !== imageIndex && "brightness-50",
    //           )}
    //           key={index}
    //         >
    //           <Image
    //             src={image}
    //             alt={image}
    //             key={index}
    //             width={160}
    //             height={240}
    //           />
    //           <RadioGroupItem value={`${index}`} />
    //         </div>
    //       ))}
    //     </RadioGroup>
    //
    //     <Button>已提交</Button>
    //   </div>
    // );

    case MessageType.ProductLink:
    // return (
    //   <div className={"flex flex-col gap-2"}>
    //     <div className={"flex justify-between rounded-lg bg-[#3D3847] p-2"}>
    //       <div className={"flex items-center gap-2"}>
    //         <div className={"w-[80px] "}>
    //           <AspectRatio ratio={1}>
    //             <Image
    //               src={body.cover!}
    //               alt={"cover"}
    //               fill
    //               className="rounded-md object-cover"
    //             />
    //           </AspectRatio>
    //         </div>
    //
    //         <div className={"flex grow flex-col gap-2"}>
    //           <div>{body.title}</div>
    //           <Hot value={body.hotValue} />
    //         </div>
    //       </div>
    //     </div>
    //
    //     <div className={"text-muted-foreground text-xs"}>
    //       来自{body.source}
    //     </div>
    //   </div>
    // );

    case MessageType.Others:

    default:
      return body.type
  }
}
