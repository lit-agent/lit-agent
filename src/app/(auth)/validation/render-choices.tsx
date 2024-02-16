import { IMessageContainer } from "@/components/chat/message-item"
import { useState } from "react"
import { MessageType } from "@/schema/message.base"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export const RenderChoices = ({
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
