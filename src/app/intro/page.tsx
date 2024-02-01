"use client";

import Assets from "@/components/assets";
import Image from "next/image";
import { GiuguProfile } from "@/containers/blogger";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { PHONE_REGEX, SMS_EXPIRE_MINUTES } from "@/const";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import "react-phone-number-input/style.css";
import { sendSms, validateSms } from "@/server/sms";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { signIn } from "next-auth/react";

export default function GuidancePage() {
  // 1. Define your form.
  const formSchema = z.object({
    phone: z
      .string()
      .regex(PHONE_REGEX, "请输入有效的手机号码！")
      .default("17766091857"),
    code: z.string().regex(/\d{6}/, "请输入有效的验证码！"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // ref: https://github.com/orgs/react-hook-form/discussions/9252#discussioncomment-3926048
    defaultValues: {
      phone: "",
      code: "",
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const [sendingSms, setSendingSms] = useState(false);
  const sendSms = api.sms.send.useMutation();
  const router = useRouter();
  const onRequestingVerifyCode = async (event) => {
    event.preventDefault(); // 防止触发form的验证
    setSendingSms(true);

    const phone = watch("phone");
    console.log("-- phone: ", phone);

    const res = await sendSms.mutateAsync({ phone });
    console.log("-- res: ", res);

    const msg = res?.SendStatusSet![0]!.Code;
    if (msg === "Ok") {
      toast.success("验证码发送状态！");
      void router.push("/validation");
      // void location.replace("/validation");
    } else toast.error(`验证码发送失败，原因：${msg}`);

    setSendingSms(false);
  };

  const [submitting, setSubmitting] = useState(false);
  // 2. Define a submit handler.

  async function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setSubmitting(true);

    const phone = watch("phone");
    const code = watch("code");
    const res = await signIn("sms", {
      phone,
      code,
      redirect: false,
      // callbackUrl: '/', // 感谢: https://github.com/sidebase/nuxt-auth/issues/469#issuecomment-1661909912
    });
    console.log("-- res: ", res);

    setSubmitting(false);
    if (!res) return;
    if (res.ok) {
      toast.success("登录成功！");

      // void router.push('/'); // 这个不行
      void location.replace("/validation"); // 这个可以，ref: https://stackoverflow.com/a/77209617
    } else toast.error(res.error);
  }

  return (
    <div className={"flex flex-col items-center h-full bg-[#2A2435]"}>
      <Image
        src={Assets.CoverMdImage}
        alt={"cover"}
        width={640}
        height={800}
        className={"h-2/3 bg-gradient-to-b from-blue-500"}
      />

      <div className={"-mt-[30px]"}>
        <GiuguProfile />
      </div>

      <div className={"grow"} />

      <div className={"flex flex-col gap-2 p-8"}>
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
                        <Input placeholder={"+86"} {...field} />
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
                          disabled={
                            !watch("phone") || !!errors.phone || sendingSms
                          }
                        >
                          获取验证码
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
    </div>
  );
}