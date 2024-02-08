"use client"

import { useForm } from "react-hook-form"
import { createProductSchema, ICreateProduct } from "@/schema/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formFieldControlMap, FormFieldType } from "@/lib/form"
import { zipObject } from "lodash"

const createProductData: {
  name: keyof ICreateProduct
  label: string
  type: FormFieldType
  description?: string
  default?: any
}[] = [
  { name: "title", label: "标题", type: "string", default: "default title" },
  {
    name: "description",
    label: "描述",
    type: "text",
    default: "default description",
  },
  { name: "images", label: "图片列表", type: "images", default: [] },
  {
    name: "price",
    label: "定价",
    type: "number",
    description: "以火值（整数）定价（为人民币的10倍）",
    default: 10,
  },
  { name: "total", label: "库存", type: "number", default: 10 },
  { name: "detail", label: "详情", type: "text", default: "default detail" },
  { name: "isOnsite", label: "是否需要线下", type: "boolean", default: false },
  {
    name: "isSelfOperating",
    label: "是否自营",
    type: "boolean",
    default: true,
  },
  {
    name: "isReturnable",
    label: "是否支持退款",
    type: "boolean",
    default: true,
  },
  {
    name: "isReservationRequired",
    label: "是否需要预约",
    type: "boolean",
    default: true,
  },
]

export default function CreateProductPage() {
  const form = useForm<ICreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: zipObject(
      createProductData.map((d) => d.name),
      createProductData.map((d) => d.default),
    ),
  })

  const createProduct = api.product.create.useMutation()

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
          {createProductData.map((formField, index) => {
            const Comp = formFieldControlMap[formField.type]
            return (
              <FormField
                key={index}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      formField.type === "boolean" &&
                        "space-y-0 flex items-center gap-4",
                    )}
                  >
                    <FormLabel>{formField.label}</FormLabel>
                    <Comp field={field} />
                    <FormDescription>{formField.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}

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
