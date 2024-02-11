"use client"

import {
  IMessageContainer,
  MessageContainer,
} from "@/components/chat/message-item"
import { Button, buttonVariants } from "../../../components/ui/button"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { api } from "@/lib/trpc/react"
import { MessageType } from "@/schema/message.base"
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
import { CURSOR_CLASS_NAME, jiuguAvatar } from "@/config"
import { TypeAnimation } from "react-type-animation"
import { useElementSize } from "usehooks-ts"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

export default function ValidationPage() {
  const [answer, setAnswer] = useState<Validation>({
    4: [],
    5: [],
    6: [],
    7: [],
  })

  const [openRename, setOpenRename] = useState(false)

  const [step, setStep] = useState(1)
  const [showChoices, setShowChoices] = useState(false)

  const refBottom = useRef<HTMLDivElement>(null)
  const [refWindowInner, { height: heightInner }] = useElementSize()
  const [refWindowOuter, { height: heightOuter }] = useElementSize()

  useEffect(() => {
    refBottom.current?.scrollIntoView()
  }, [heightInner, heightOuter, step])

  const body = guidanceItems[step - 1]!.body

  const isChoosing = body.type === MessageType.TextChoices
  const [chosen, setChosen] = useState<number[]>([])

  console.log({ step, answer })

  const [validating, setValidating] = useState(false)

  const validate = api.user.validate.useMutation()

  return (
    <div className={"flex h-full flex-col"}>
      <Rename open={openRename} setOpen={setOpenRename} />

      <Progress value={(step / 8) * 100} className="w-full" />

      <div className={" grow overflow-auto p-4"} ref={refWindowOuter}>
        <div className={"flex flex-col gap-4"} ref={refWindowInner}>
          {
            // sampleChatItems
            guidanceItems.slice(0, step).map((message, index) => (
              <TyperMessage
                message={message}
                key={index}
                onFinish={() => {
                  if (message.body.type === MessageType.Plain) {
                    setStep(step + 1)
                  } else {
                    setShowChoices(true)
                  }
                }}
              />
            ))
          }
        </div>

        <div ref={refBottom} />
      </div>

      <div className={"flex flex-col gap-4 p-4"}>
        {showChoices &&
          body.type === MessageType.TextChoices &&
          body.choices.map((choice, index) => (
            <Label
              className={cn(
                buttonVariants(),
                "bg-[#40394A] hover:bg-[#40394A] text-white relative",
              )}
              key={index}
            >
              <Checkbox
                className={"absolute left-2 top-0 bottom-0 my-auto"}
                checked={chosen.includes(index)}
                onCheckedChange={(checked) => {
                  if (!body.multiple) setChosen([index])
                  else {
                    const newChosen = [...chosen]
                    if (newChosen.includes(index))
                      setChosen(newChosen.filter((c) => c !== index))
                    else setChosen([...newChosen, index].toSorted())
                  }
                }}
              />

              {choice.value}
            </Label>
          ))}

        {isChoosing ? (
          <Button
            onClick={async () => {
              const newAnswer = { ...answer, [step - 1]: chosen }
              setAnswer(newAnswer)

              if (Object.values(newAnswer).some((s) => !s.length)) {
                setChosen([])
                setStep(step + 1)
              } else {
                setValidating(true)
                const success = await validate.mutateAsync({
                  answer: JSON.stringify(newAnswer),
                })

                if (!success) {
                  toast.error("你不算姑的friend哦，想加入再去刷刷姑的视频吧……")
                  // 在错误的时候重新允许validate，正确的时候会直接飞走
                  setValidating(false)
                } else {
                  setOpenRename(true)
                }
              }
            }}
          >
            确定
          </Button>
        ) : (
          <Button variant={"secondary"} className={"py-3 animate-pulse"}>
            <div className={"dot-pulse"} />
          </Button>
        )}
      </div>
    </div>
  )
}

const Rename = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const router = useRouter()
  const { data: users = [] } = api.user.list.useQuery()
  const user = useUser()

  return (
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
  )
}

type Validation = Record<number, number[]>

const TyperMessage = ({
  message,
  onFinish,
}: {
  message: IMessageContainer
  onFinish: () => void
}) => {
  if (
    message.body.type !== MessageType.Plain &&
    message.body.type !== MessageType.TextChoices
  )
    return
  const title = message.body.title!

  return (
    <MessageContainer user={message.user}>
      <TypeAnimation
        cursor={false}
        className={CURSOR_CLASS_NAME}
        speed={30}
        sequence={[
          (el) => el?.classList.add(CURSOR_CLASS_NAME),
          title,
          (el) => el?.classList.remove(CURSOR_CLASS_NAME),
          onFinish,
        ]}
      />
    </MessageContainer>
  )
}

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
