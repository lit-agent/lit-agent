import { z } from "zod"
import { PHONE_REGEX } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCountdown } from "@/hooks/use-countdown"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { SMS_EXPIRE_MINUTES, SMS_PROVIDER_ID } from "@/lib/sms"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CgSpinner } from "react-icons/cg"

export const LoginFormViaSMS = ({ open, setOpen }) => {
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
  const router = useRouter()

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

    if (!result?.ok) {
      toast.error(`登录失败，原因：${result?.error}`)
    } else {
      router.push("/")
      toast.success("登录成功！")
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={"bottom"}>
        <Form {...form}>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-primary"}>手机号</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder={"+86"} {...field} />
                  </FormControl>
                  <FormDescription>该号码将会是您的唯一ID标识</FormDescription>
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
                      <Input placeholder="000000" {...field} />
                    </FormControl>
                    <Button
                      onClick={onRequestingVerifyCode}
                      className={"w-32"}
                      disabled={
                        ticking ||
                        !watch("phone") ||
                        !!errors.phone ||
                        submitting
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
                  <FormDescription>
                    一次性验证码，{SMS_EXPIRE_MINUTES}分钟内有效
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={onSubmit}
              className={"w-full"}
              disabled={
                !watch("phone") ||
                !watch("code") ||
                !!errors.phone ||
                !!errors.code ||
                submitting
              }
            >
              注册/登录
            </Button>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
