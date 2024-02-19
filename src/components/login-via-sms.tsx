"use client"

import { z } from "zod"
import { PHONE_REGEX } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCountdown } from "@/hooks/use-countdown"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { useState } from "react"
import { signIn } from "next-auth/react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CgSpinner } from "react-icons/cg"
import { SMS_PROVIDER_ID } from "@/lib/sms/config"

export const LoginViaSMS = () => {
  const formSchema = z.object({
    phone: z
      .string()
      .regex(PHONE_REGEX, "请输入有效的手机号码！")
      .default("17766091857"),
    code: z.string().regex(/\d{6}/, "请输入有效的验证码！"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // ref: https://github.com/orgs/react-hook-form/discussions/9252#discussioncomment-3926048
    defaultValues: {
      phone: "",
      code: "",
    },
  })

  const {
    watch,
    formState: { errors },
  } = form

  const { count, start, ticking } = useCountdown({ startValue: 60 })

  const sendSms = api.sms.send.useMutation()

  const onRequestingVerifyCode = async (event) => {
    event.preventDefault() // 防止触发form的验证
    start()

    const phone = watch("phone")
    const { success, message } = await sendSms.mutateAsync({ phone })
    if (success) {
      toast.success("验证码已发送！")
    } else toast.error(`验证码发送失败，原因：${message}`)
  }

  const [submitting, setSubmitting] = useState(false)

  async function onSubmit() {
    setSubmitting(true)

    const phone = watch("phone")
    const code = watch("code")

    const result = await signIn(SMS_PROVIDER_ID, {
      phone,
      code,
      redirect: false,
      // todo: auth
      // callbackUrl: "/", // 感谢: https://github.com/sidebase/nuxt-auth/issues/469#issuecomment-1661909912
    })
    setSubmitting(false)
    console.log("[IntroPage] sign in result: ", result)
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-primary"}>手机号</FormLabel>
            <FormControl>
              <Input autoFocus placeholder={"+86"} {...field} />
            </FormControl>
            {/*<FormDescription>该号码将会是您的唯一ID标识</FormDescription>*/}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-primary"}>验证码</FormLabel>
            <div className={"flex gap-2"}>
              <FormControl>
                <Input
                  placeholder="000000"
                  type={"text"}
                  // ref: https://dev.to/madsstoumann/using-a-single-input-for-one-time-code-352l
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="\d{6}"
                  {...field}
                />
              </FormControl>

              <Button
                onClick={onRequestingVerifyCode}
                className={"w-32"}
                disabled={
                  ticking || !watch("phone") || !!errors.phone || submitting
                }
              >
                {ticking ? (
                  <>
                    <CgSpinner className={"animate-spin"} />（{count}）
                  </>
                ) : (
                  "获取验证码"
                )}
              </Button>
            </div>
            {/*<FormDescription>*/}
            {/*  一次性验证码，{SMS_EXPIRE_MINUTES}分钟内有效*/}
            {/*</FormDescription>*/}
            <FormMessage />
          </FormItem>
        )}
      />

      {watch("phone") && watch("code") && (
        <Button
          onClick={onSubmit}
          className={"w-full"}
          disabled={!!errors.phone || !!errors.code || submitting}
        >
          注册/登录
        </Button>
      )}
    </Form>
  )
}
