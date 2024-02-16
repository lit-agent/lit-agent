import {
  IMessageContainer,
  MessageContainer,
} from "@/components/chat/message-item"
import { MessageType } from "@/schema/message.base"
import { TypeAnimation } from "react-type-animation"
import { CURSOR_CLASS_NAME, TYPER_SPEED } from "@/config"

export const TyperMessage = ({
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
