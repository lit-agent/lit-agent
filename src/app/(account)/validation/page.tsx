"use client"

import {
  IMessageContainer,
  MessageContainer,
} from "@/components/chat/message-item"
import { Button, buttonVariants } from "../../../components/ui/button"
import { useEffect, useRef, useState } from "react"
import { api } from "@/lib/trpc/react"
import { MessageType } from "@/schema/message.base"
import { CURSOR_CLASS_NAME, jiuguAvatar, TYPER_SPEED } from "@/config"
import { TypeAnimation } from "react-type-animation"
import { useElementSize } from "usehooks-ts"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { IMessageBody } from "@/schema/message"
import ValidateSuccess from "@/app/(account)/validation/success/page"
import ValidateFail from "@/app/(account)/validation/fail/page"

const user = jiuguAvatar
type Validation = Record<number, number[]>

export default function ValidationPage() {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)
  console.log({ step })

  return (
    <div className={"flex h-full flex-col"}>
      <Progress value={(step / 7) * 100} className="w-full" />

      <MessagesArea
        step={step}
        setStep={setStep}
        typing={typing}
        setTyping={setTyping}
        success={success}
      />

      <BottomArea
        step={step}
        setStep={setStep}
        typing={typing}
        setSuccess={setSuccess}
      />
    </div>
  )
}

const BottomArea = ({ step, setStep, typing, setSuccess }) => {
  const validateAnswer = api.user.validateAnswer.useMutation()
  const refAnswer = useRef<Validation>({
    4: [],
    5: [],
    6: [],
    7: [],
  })

  return (
    <div className={"flex flex-col gap-4 p-4"}>
      {!typing && step < bodies.length && (
        <RenderChoices
          message={{ body: bodies[step]!, user }}
          onChosen={(v) => {
            const newStep = step + 1
            setStep(newStep)
            refAnswer.current = { ...refAnswer.current, [step]: v }
            if (newStep === bodies.length)
              validateAnswer
                .mutateAsync({
                  answer: JSON.stringify(refAnswer.current),
                })
                .then(setSuccess)
          }}
        />
      )}

      {typing && (
        <Button variant={"secondary"} className={"py-3 animate-pulse"}>
          <div className={"dot-pulse"} />
        </Button>
      )}
    </div>
  )
}

const MessagesArea = ({ step, setStep, typing, setTyping, success }) => {
  const refBottom = useRef<HTMLDivElement>(null)
  const [refWindowInner, { height: heightInner }] = useElementSize()
  useEffect(() => {
    refBottom.current?.scrollIntoView()
  }, [heightInner, step, typing])

  return (
    <div
      className={"grow overflow-auto flex flex-col gap-4"}
      ref={refWindowInner}
    >
      {
        // sampleChatItems
        bodies.slice(0, step + 1).map((body, index) => (
          <TyperMessage
            message={{ body, user }}
            key={index}
            onInit={() => {
              setTyping(true)
            }}
            onFinish={() => {
              if (body.type === MessageType.Plain) setStep(step + 1)
              setTyping(false)
            }}
          />
        ))
      }

      {success ? (
        <MessageContainer user={user}>
          <ValidateSuccess />
        </MessageContainer>
      ) : success === false ? (
        <MessageContainer user={user}>
          <ValidateFail />
        </MessageContainer>
      ) : null}

      <div ref={refBottom} />
    </div>
  )
}

const RenderChoices = ({
  message,
  onChosen,
}: {
  message: IMessageContainer
  onChosen: (v: number[]) => void
}) => {
  const [chosen, setChosen] = useState<number[]>([])

  const body = message.body
  if (body.type !== MessageType.TextChoices) return

  return (
    <>
      {body.choices.map((choice, index) => (
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

      <Button disabled={!chosen.length} onClick={() => onChosen(chosen)}>
        确定
      </Button>
    </>
  )
}

const TyperMessage = ({
  message,
  onInit,
  onFinish,
}: {
  message: IMessageContainer
  onInit: () => void
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
        speed={TYPER_SPEED}
        sequence={[
          onInit,
          (el) => el?.classList.add(CURSOR_CLASS_NAME),
          title,
          (el) => el?.classList.remove(CURSOR_CLASS_NAME),
          onFinish,
        ]}
      />
    </MessageContainer>
  )
}

const bodies: IMessageBody[] = [
  {
    type: MessageType.Plain,
    title: "Hello，我是玖姑。欢迎加入我的朋友圈。",
  },
  {
    type: MessageType.Plain,
    title:
      "在这里，你可以通过完成我指定的一些任务来获得火值。火值可以用来兑换我提供的产品和服务。",
  },
  {
    type: MessageType.Plain,
    title: "未来，这里还会有很多惊喜，请期待它们一一与你的见面。",
  },
  {
    type: MessageType.Plain,
    title: "首先，我需要筛选一下真正的我的friend。请回答以下几个问题：",
  },
  {
    type: MessageType.TextChoices,
    title: "玖姑为什么不化妆？（多选）",
    multiple: true,
    choices: [
      { value: "懒的化", checked: true },
      { value: "对颜值自信", checked: true },
      { value: "挑战公众对女性的束缚", checked: true },
    ],
  },
  {
    type: MessageType.TextChoices,
    title: "玖姑的立场是？",
    multiple: false,
    choices: [
      { value: "厌男", checked: false },
      { value: "厌女", checked: false },
      { value: "厌蠢", checked: false },
    ],
  },
  {
    type: MessageType.TextChoices,
    title: "玖姑是否支持彩礼？",
    multiple: false,
    choices: [
      { value: "是", checked: false },
      { value: "否", checked: false },
      { value: "无所谓", checked: true },
    ],
  },
  {
    type: MessageType.TextChoices,
    title: "玖姑的目标是什么？",
    multiple: false,
    choices: [
      { value: "成为世界巨星", checked: true },
      { value: "赚一个小目标", checked: false },
      { value: "环游世界", checked: false },
    ],
  },
]
