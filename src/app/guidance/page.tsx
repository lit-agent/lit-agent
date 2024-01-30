"use client";

import Assets from "@/components/assets";
import Image from "next/image";
import { GiuguProfile } from "@/containers/blogger";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { PHONE_REGEX } from "@/const";
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
import { isValidPhoneNumber } from "react-phone-number-input";

export default function GuidancePage() {
  // 1. Define your form.
  const formSchema = z.object({
    phone: z.string().regex(PHONE_REGEX, "请输入有效的手机号码！"),
    code: z.string().regex(/\d{6}/, "请输入有效的验证码！"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      code: "",
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const onRequestingVerifyCode = () => {
    const phone = watch("phone");
    console.log("-- phone: ", phone);
  };

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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                          disabled={!!errors.phone}
                        >
                          获取验证码
                        </Button>
                      </div>
                      <FormDescription>
                        一次性验证码，十分钟内有效
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className={"w-full"}>
                  注册/登录
                </Button>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
