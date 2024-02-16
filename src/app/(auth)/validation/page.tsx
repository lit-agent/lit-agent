"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { BottomArea } from "@/app/(auth)/validation/bottom-area"
import { MessagesArea } from "@/app/(auth)/validation/message-area"

export default function ValidationPage() {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)
  // console.log({ step })

  return (
    <div className={"flex h-full flex-col"}>
      <Progress value={(step / 7) * 100} className="w-full" />

      <MessagesArea
        step={step}
        setStep={setStep}
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
