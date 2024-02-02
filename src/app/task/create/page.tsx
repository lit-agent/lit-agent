"use client";

import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),
  images: z.array(z.string()).optional(),
  detail: z.string(),
  price: z.number(),
  isOnsite: z.boolean(),
  isSelfOperating: z.boolean(),
  isReturnable: z.boolean(),
  isReservationRequired: z.boolean(),
  surplus: z.number(),
});

export default function CreateTaskPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "test - " + new Date().toLocaleString(),
      description: "# test",
      detail: "# test",
      images: [],
      isOnsite: false,
      isReturnable: true,
      isReservationRequired: true,
      isSelfOperating: true,
      price: 100,
      surplus: 10,
    },
  });

  const { user } = useUser();
  const createProduct = api.task.create.useMutation();

  const issuerId = user?.id;
  console.log("-- issuerId: ", issuerId);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("-- submit: ", { values, issuerId });

    createProduct
      .mutateAsync({
        // 不能混合 entity 和 entityId 类别 properties
        data: {
          ...values,

          issuer: {
            connect: {
              id: issuerId,
            },
          },

          room: {
            create: {
              users: {
                connect: {
                  id: issuerId,
                },
              },
            },
          },
        },
      })
      .then((res) => {
        toast.success("创建成功！");
      })
      .catch((e) => {
        console.error(e);
        toast.error("创建失败");
      });
  }

  return (
    <div className={"flex flex-col p-8 bg-black"}>
      <Label className={"my-8 text-xl"}>创建任务</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>定价</FormLabel>
                <FormControl>
                  <Input type={"number"} {...field} />
                </FormControl>
                <FormDescription>
                  以火值（整数）定价（为人民币的10倍）
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surplus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>库存</FormLabel>
                <FormControl>
                  <Input type={"number"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>详情</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormDescription>Markdown格式，支持图文</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>图片列表</FormLabel>
                <FormControl>
                  <Input type={"file"} accept={"image/*"} />
                </FormControl>
                <FormDescription>（待开发）第一张会作为封面</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isOnsite"
            render={({ field }) => (
              <FormItem>
                <div className={"flex items-center gap-2"}>
                  <FormLabel>是否需要线下</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isSelfOperating"
            render={({ field }) => (
              <FormItem>
                <div className={"flex items-center gap-2"}>
                  <FormLabel>是否自营</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isReturnable"
            render={({ field }) => (
              <FormItem>
                <div className={"flex items-center gap-2"}>
                  <FormLabel>是否支持退款</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isReservationRequired"
            render={({ field }) => (
              <FormItem>
                <div className={"flex items-center gap-2"}>
                  <FormLabel>是否需要预约</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className={"w-full"}>
            提交
          </Button>
        </form>
      </Form>
    </div>
  );
}
