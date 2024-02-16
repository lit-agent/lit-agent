import { useEffect, useRef } from "react"
import { useElementSize } from "usehooks-ts"
import { bodies, user } from "@/app/(auth)/validation/config"
import { TyperMessage } from "@/app/(auth)/validation/typer-message"
import { MessageType } from "@/schema/message.base"
import { MessageContainer } from "@/components/chat/message-item"
import ValidateSuccess from "@/app/(auth)/validation/success/page"
import ValidateFail from "@/app/(auth)/validation/fail/page"

export const MessagesArea = ({ step, setStep, setTyping, success }) => {
  const refBottom = useRef<HTMLDivElement>(null)
  const [refWindowInner, { height: heightInner }] = useElementSize()
  useEffect(() => {
    refBottom.current?.scrollIntoView({ behavior: "smooth" })
  }, [heightInner, success])

  return (
    <div className={"grow overflow-auto"}>
      <div className={"flex flex-col gap-4"} ref={refWindowInner}>
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
    </div>
  )
}