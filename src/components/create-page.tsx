import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { zipObject } from "lodash"
import { toast } from "sonner"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { FormFieldControlMap, FormFieldType } from "@/schema/form"
import { useRouter } from "next/navigation"

export default function CreateFormPage<T = any>({
  data,
  schema,
  route,
  callbackUrl,
}: {
  route
  schema
  data: {
    name: keyof T
    label: string
    type: FormFieldType
    description?: string
    default?: any
  }[]
  callbackUrl: string
}) {
  type Schema = z.infer<typeof schema>

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: zipObject(
      data.map((d) => d.name),
      data.map((d) => d.default),
    ),
  })

  const { errors } = form.formState

  const create = route.create.useMutation()
  const router = useRouter()

  function onSubmit(values: Schema) {
    console.log(`create: `, { values })

    create
      .mutateAsync(values)
      .then((res) => {
        toast.success("创建成功！")
        router.push(callbackUrl)
      })
      .catch((e) => {
        console.error(e)
        toast.error("创建失败")
      })
  }

  return (
    <div className={"flex flex-col p-4 bg-black"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
          {data.map((formField, index) => {
            const Comp = FormFieldControlMap[formField.type]
            return (
              <FormField
                key={index}
                control={form.control}
                name={formField.name as string}
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

          {!!Object.keys(errors).length && (
            <div className={"whitespace-pre-wrap text-red-700"}>
              {JSON.stringify(errors, null, 2)}
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
