"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Message, { IMessageContainer } from "@/components/chat/message-item"
import { IoMenuOutline } from "react-icons/io5"
import { Button } from "../../../components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { api } from "@/lib/trpc/react"

import { JiuguImage } from "@/lib/assets"
import { MessageType } from "@/schema/message.base"
import { jiuguAvatar } from "@/config"
import { BloggerContainer } from "@/components/user/blogger-container"
import { BasicMutableUserInfo } from "@/components/user/basic"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { FireValue } from "@/components/_universal/fire-value"
import { useUser } from "@/hooks/use-user"

export default function ValidationPage() {
  const [validating, setValidating] = useState(false)
  const [answer, setAnswer] = useState<Validation>({
    4: [],
    5: [],
    6: [],
    7: [],
  })

  const [validationResult, setValidationResult] = useState<ValidationResult>(
    ValidationResult.unknown,
  )

  const validate = api.user.validate.useMutation()

  const router = useRouter()

  const [open, setOpen] = useState(false)
  const { data: users = [] } = api.user.list.useQuery()
  const user = useUser()

  return (
    <div className={"flex h-full flex-col"}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              恭喜第
              <span className={"text-primary mx-1"}>
                {users.filter((u) => u.validated).length + 1}
              </span>
              位粉丝通过测试！
            </AlertDialogTitle>
            <AlertDialogDescription
              className={"flex flex-col items-center gap-1"}
            >
              <span>你果然是姑的friend，恭喜你获得火伴身份！</span>
              <span className={"flex items-center"}>
                我们将赠送您 <FireValue value={10} />
                ，可用于兑换玖姑的服务哦！
              </span>
              <span>但在进入玖姑的私域之前，请先换下马甲吧！</span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <BasicMutableUserInfo />

          <AlertDialogFooter>
            <AlertDialogAction
              disabled={!user?.image || !user?.name}
              onClick={() => {
                router.push("/")
              }}
            >
              确定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className={"flex items-center justify-center gap-1 p-2"}>
        <Avatar className={"h-5 w-5"}>
          <AvatarImage src={JiuguImage.src} />
        </Avatar>

        <div>玖姑</div>
      </div>

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {
          // sampleChatItems
          guidanceItems.map((chatItem, index) => (
            <Message
              {...chatItem}
              key={index}
              onValueChange={(v) => {
                setAnswer({ ...answer, [index]: v })
              }}
            />
          ))
        }

        {validationResult === ValidationResult.unknown && (
          <Button
            disabled={
              validating || Object.values(answer).some((v) => !v.length)
            }
            onClick={async () => {
              setValidating(true)
              const success = await validate.mutateAsync({
                answer: JSON.stringify(answer),
              })

              if (!success) {
                toast.error("你不算姑的friend哦，想加入再去刷刷姑的视频吧……")
                // 在错误的时候重新允许validate，正确的时候会直接飞走
                setValidating(false)
              } else {
                setOpen(true)
              }
            }}
          >
            提交
          </Button>
        )}
      </div>

      <div className={"relative px-4 py-1"}>
        <BloggerContainer
          className={
            "absolute bottom-0 right-5 top-0 my-auto h-6 w-6 text-gray-400"
          }
        >
          <IoMenuOutline />
        </BloggerContainer>
      </div>
    </div>
  )
}

enum ValidationResult {
  unknown,
  ok,
  failed,
}

type Validation = Record<number, number[]>

const guidanceItems: IMessageContainer[] = [
  {
    user: jiuguAvatar,
    body: {
      type: MessageType.Plain,
      title: "Hello，我是玖姑。欢迎加入我的朋友圈。",
    },
  },

  {
    user: jiuguAvatar,
    body: {
      type: MessageType.Plain,
      title:
        "在这里，你可以通过完成姑指定的一些任务来获得火值。火值可以用来兑换姑提供的产品和服务。",
    },
  },

  {
    user: jiuguAvatar,
    body: {
      type: MessageType.Plain,
      title: "未来，这里还会有很多惊喜，请期待它们一一与你的见面。",
    },
  },

  {
    user: jiuguAvatar,
    body: {
      type: MessageType.Plain,
      title: "首先，我需要筛选一下真正的姑的friend。请回答以下几个问题：",
    },
  },

  {
    user: jiuguAvatar,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑为什么不化妆？（多选）",
      multiple: true,
      choices: [
        { value: "懒的化", checked: true },
        { value: "对颜值自信", checked: true },
        { value: "挑战公众对女性的束缚", checked: true },
      ],
    },
  },

  {
    user: jiuguAvatar,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑的立场是？",
      multiple: false,
      choices: [
        { value: "厌男", checked: false },
        { value: "厌女", checked: false },
        { value: "厌蠢", checked: false },
      ],
    },
  },
  {
    user: jiuguAvatar,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑是否支持彩礼？",
      multiple: false,
      choices: [
        { value: "是", checked: false },
        { value: "否", checked: false },
        { value: "无所谓", checked: true },
      ],
    },
  },
  {
    user: jiuguAvatar,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑的目标是什么？",
      multiple: false,
      choices: [
        { value: "成为世界巨星", checked: true },
        { value: "赚一个小目标", checked: false },
        { value: "环游世界", checked: false },
      ],
    },
  },
]
