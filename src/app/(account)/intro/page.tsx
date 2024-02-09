"use client"

import { CoverMdImage } from "@/lib/assets"
import Image from "next/image"
import { GiuguProfile } from "@/components/blogger"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"

import "react-phone-number-input/style.css"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { api } from "@/lib/trpc/react"
import { signIn } from "next-auth/react"
import { cn, PHONE_REGEX } from "@/lib/utils"
import { SMS_EXPIRE_MINUTES } from "@/lib/sms"
import { useCountdown } from "@/hooks/use-countdown"
import { CgSpinner } from "react-icons/cg"
import { useUser } from "@/hooks/use-user"
import { useRouter } from "next/navigation"

export default function IntroPage() {
  return (
    <div
      className={cn(
        "flex items-center h-full bg-[#2A2435]",
        "flex-col-reverse", // 使用倒序保证页面布局稳定性，封面图是后出现的，todo:更好的办法
      )}
    >
      <Comp3 />
      <Comp2 />
      <Comp1 />
    </div>
  )
}

const Comp1 = () => (
  <div className={"w-full h-[60%] relative"}>
    <Image
      src={CoverMdImage}
      alt={"cover"}
      priority
      className={"h-full w-full"}
      style={{
        objectFit: "cover",
      }}
    />
  </div>
)

const Comp2 = () => <GiuguProfile className={"-mt-6 z-10"} />

const Comp3 = () => {
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
    const res = await signIn("sms", {
      phone,
      code,
      redirect: false,
      // callbackUrl: '/', // 感谢: https://github.com/sidebase/nuxt-auth/issues/469#issuecomment-1661909912
    })
    console.log("[Auth] signed res: ", res)

    if (res?.ok) toast.success("登录成功！")
    else toast.error(res?.error ?? "登录失败", { duration: 3000 })

    setSubmitting(false)
  }

  const router = useRouter()
  const user = useUser()
  useEffect(() => {
    console.log("[IntroPage] user: ", user)
    if (!user) return
    router.push(user.validated ? "/" : "/validation")
  }, [user])

  return (
    <div className={"mt-auto flex flex-col items-center pb-8 gap-4"}>
      <div className={"text-muted-foreground text-sm"}>
        <span className={"text-primary"}>13891</span> 人已加入玖姑私域
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button className={"text-white "}>成为姑的Friend</Button>
        </SheetTrigger>

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
                    <FormDescription>
                      该号码将会是您的唯一ID标识
                    </FormDescription>
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
    </div>
  )
}
