import { api } from "@/lib/trpc/react"
import { useRef } from "react"
import { Validation, bodies, user } from "@/app/(auth)/validation/config"
import { RenderChoices } from "@/app/(auth)/validation/render-choices"
import { Button } from "@/components/ui/button"

export const BottomArea = ({ step, setStep, typing, setSuccess }) => {
  const validateAnswer = api.user.validateAnswer.useMutation()
  const refAnswer = useRef<Validation>({
    4: { value: [] },
    5: { value: [] },
    6: { value: [] },
    7: { value: [] },
  })

  return (
    <div className={"flex flex-col gap-4 p-4"}>
      {!typing && step < bodies.length && (
        <RenderChoices
          message={{ body: bodies[step]!, user }}
          onChosen={(v) => {
            const newStep = step + 1
            setStep(newStep)
            refAnswer.current = {
              ...refAnswer.current,
              [step]: { value: v, date: new Date() },
            }
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
