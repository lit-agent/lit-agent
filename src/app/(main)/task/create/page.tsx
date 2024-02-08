"use client"

import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { ChevronLeftIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { MessageType, SupportedMessageTypes } from "@/schema/message.base"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useUserPreference } from "@/lib/store/use-user-preference"
import moment from "@/lib/datetime"
import { useRouter } from "next/navigation"
import { FormFieldControlMap } from "@/lib/form"
import { createTaskSchema } from "@/schema/task"

import { createTaskData } from "@/app/(business)/create/config"

const schema = createTaskSchema
const FINISHED = 3

export default function CreateTaskWithUserPage() {
  const { preferredMessageType: type, setPreferredMessageType } =
    useUserPreference()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: 10,
      startTime: moment().toDate(),
      endTime: moment().add(1, "days").toDate(),
      body: {
        type, // !important
        title:
          "我会在我的社群如实分享更多律师咨询的细节，欢迎去同名公众号帮我传播视频...",
        platform: "不孤岛",
        targetUsers: "全体姑的Friends",
        purpose:
          "1. 在视频号里看完我这条短视频作品\n" +
          "2. 点赞、评论、转发、收藏该作品，帮助作品更好的传播",
        choices: [
          { value: "#1 ", checked: false },
          { value: "#2 ", checked: false },
        ],
      },
    },
  })

  const {
    formState: { errors },
  } = form

  const createTask = api.task.create.useMutation()
  const [submitting, setSubmitting] = useState(false)
  const utils = api.useUtils()

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof schema>) {
    console.log("[TaskPage] create task: ", values)
    setSubmitting(true)
    createTask
      .mutateAsync(values)
      .then((res) => {
        toast.success("创建成功！")
        // utils.task.invalidate() // 触发刷新 // 没用，因为目前task是从user找的,todo: trpc tasks
        // void router.push("/");
      })
      .catch((e) => {
        console.error(e)
        toast.error("创建失败")
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.error(errors)
    }
  }, [JSON.stringify(errors)])

  const router = useRouter()

  return (
    <div className={"h-full flex flex-col p-4 bg-black"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full overflow-hidden flex flex-col gap-2"
        >
          <div className={"flex gap-2 py-2 items-center"}>
            <Label
              className={"my-8 text-xl text-primary flex items-centre gap-2"}
              onClick={router.back}
            >
              <ChevronLeftIcon /> 发布新任务️
            </Label>

            <Label className={"text-xs text-muted-foreground hidden sm:block"}>
              （仅博主可见）️
            </Label>

            <div className={"grow"} />

            <Button
              disabled={submitting}
              size={"sm"}
              className={"h-fit px-6 py-1 "}
              variant={"outline"}
              onClick={(event) => {
                event.preventDefault()
                toast.info("todo ~")
              }}
            >
              预览
            </Button>

            <Button
              type="submit"
              disabled={submitting}
              size={"sm"}
              className={"h-fit px-6 py-1 "}
            >
              提交
            </Button>
          </div>

          <Separator orientation={"horizontal"} />

          <Tabs
            className={"h-full flex gap-4 overflow-hidden"}
            value={type}
            onValueChange={(value) => {
              form.setValue("body.type", value as SupportedMessageTypes)
              setPreferredMessageType(value as SupportedMessageTypes)
            }}
          >
            <TabsList
              className={
                "flex flex-col overflow-auto shrink-0 w-1/4 h-full bg-transparent"
              }
            >
              <Label className={"my-2 text-lg"}>选择类型</Label>

              <div className={"grow overflow-auto flex flex-col space-y-2 "}>
                {Object.values(MessageType)
                  .slice(0, FINISHED)
                  .map((messageType, index) => (
                    <TabsTrigger
                      value={messageType}
                      key={index}
                      className={cn("w-full")}
                    >
                      {messageType}
                    </TabsTrigger>
                  ))}

                <Separator orientation={"horizontal"} />
                <Label className={"mx-auto text-muted-foreground text-xs"}>
                  （待开发）
                </Label>

                {Object.values(MessageType)
                  .slice(FINISHED)
                  .map((messageType, index) => (
                    <TabsTrigger
                      value={messageType}
                      key={index}
                      className={cn("w-full")}
                      disabled
                    >
                      {messageType}
                    </TabsTrigger>
                  ))}
              </div>
            </TabsList>

            <Separator orientation={"vertical"} />

            <div className={"grow space-y-4 overflow-auto"}>
              {createTaskData.map((formField, index) => {
                const Comp = FormFieldControlMap[formField.type]
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
                        <FormDescription>
                          {formField.description}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
            </div>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}
