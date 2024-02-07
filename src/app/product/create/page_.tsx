"use client"

import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { createProductSchema } from "@/ds/product"
import { IUserView } from "@/ds/user.base"

export default function CreateProductPage_({ user }: { user: IUserView }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "# test",
      description: "# test",
      images: [],
      isOnsite: false,
      isReturnable: true,
      isReservationRequired: true,
      isSelfOperating: true,
      price: 100,
      total: 10,
      fromUserId: user.id,
    },
  })

  const createProduct = api.product.create.useMutation()

  const issuerId = user?.id

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createProductSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("[Product] create: ", { values, issuerId })

    createProduct
      .mutateAsync(values)
      .then((res) => {
        toast.success("创建成功！")
      })
      .catch((e) => {
        console.error(e)
        toast.error("创建失败")
      })
  }

  return (
    <div className={"flex flex-col p-8 bg-black"}>
      <Label className={"my-8 text-xl"}>发布产品</Label>
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
            name="total"
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
  )
}
