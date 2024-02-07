"use client"

import { MyUser } from "@/ds/user"
import { useForm } from "react-hook-form"
import { createProductSchema, ICreateProduct } from "@/ds/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { uploadFiles } from "@/lib/oss/upload/client"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { PlusCircleIcon } from "lucide-react"

export default function CreateProductPage({ user }: { user: MyUser }) {
  // 1. Define your form.
  const form = useForm<ICreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "# title",
      description: "# description",
      images: [],
      detail: "# detail",
      price: 100,
      isOnsite: false,
      isSelfOperating: true,
      isReturnable: true,
      isReservationRequired: true,
      total: 10,
      fromUserId: user.id,
    },
  })

  const createProduct = api.product.create.useMutation()

  // 2. Define a submit handler.
  function onSubmit(values: ICreateProduct) {
    console.log("[Product] create: ", { values })

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
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
                  <div className={"flex flex-col gap-2"}>
                    <Input
                      type={"file"}
                      accept={"image/*"}
                      multiple
                      onChange={async (event) => {
                        const files = event.currentTarget.files
                        if (!files) return
                        const res = await uploadFiles(files)
                        field.onChange(res.data)
                        // todo: bind field
                      }}
                    />

                    <div className={"flex items-center gap-2"}>
                      {field.value?.map((image, index) => (
                        <div className={"w-12"} key={index}>
                          <AspectRatio ratio={1}>
                            <Image
                              src={image}
                              alt={`${index}`}
                              fill
                              sizes={"100%"}
                              className={"rounded"}
                            />
                          </AspectRatio>
                        </div>
                      ))}
                    </div>
                  </div>
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
                  <Input
                    type={"number"}
                    {...field}
                    onChange={(event) => {
                      field.onChange(parseInt(event.currentTarget.value))
                    }}
                  />
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
            name="detail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>详情</FormLabel>
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

          {/*<div className={"p-2 bg-cyan-500"}>*/}
          {/*  {JSON.stringify(form.formState.errors, null, 2)}*/}
          {/*</div>*/}
        </form>
      </Form>
    </div>
  )
}
