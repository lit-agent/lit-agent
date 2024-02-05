import { IChoiceItem } from "@/ds/message.base"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MinusCircleIcon } from "lucide-react"

export const TextChoicesInput = ({
  value,
  onChange,
}: {
  value?: IChoiceItem[]
  onChange: (choice: IChoiceItem[]) => void
}) => {
  const [choices, setChoices] = useState<IChoiceItem[]>(value ?? [])

  useEffect(() => {
    onChange(choices)
  }, [JSON.stringify(choices)])

  console.log("-- input text choices: ", { value, choices })

  return (
    <div className={"flex flex-col gap-2"}>
      {choices.map((choice, index) => (
        <div key={index} className={"flex items-center gap-2"}>
          <Checkbox
            checked={choice.checked}
            onCheckedChange={(value) => {
              const newChoices = [...choices]
              newChoices[index]!.checked = !!value
              setChoices(newChoices)
            }}
          />

          <Input
            className={"grow"}
            key={index}
            value={choice.value}
            placeholder={`choice-${index + 1}`}
            onChange={(event) => {
              const newChoices = [...choices]
              newChoices[index]!.value = event.currentTarget.value
              setChoices(newChoices)
            }}
          />

          <Button
            disabled={choices.length <= 2}
            className={"shrink-0 w-fit h-fit p-0 bg-transparent text-red-800"}
            onClick={(event) => {
              setChoices(choices.filter((choice, i) => i !== index))
            }}
          >
            <MinusCircleIcon />
          </Button>
        </div>
      ))}
      <Button
        onClick={(event) => {
          event.preventDefault()
          setChoices([...choices, { value: "", checked: false }])
        }}
        variant={"outline"}
      >
        添加
      </Button>
    </div>
  )
}
