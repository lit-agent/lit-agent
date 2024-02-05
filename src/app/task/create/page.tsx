"use client"

import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import moment from "moment"
import { Input } from "@/components/ui/input"
import { HomeIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { createRequirementSchema } from "@/ds/requirement"
import { MessageType, SupportedMessageTypes } from "@/ds/message.base"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { TextChoicesInput } from "@/components/input-choices"
import { useUserPreference } from "@/hooks/use-user-preference"

const schema = createRequirementSchema
const FINISHED = 3

export default function CreateTaskWithUserPage() {
  const { preferredMessageType: type, setPreferredMessageType } =
    useUserPreference()
  // console.log("-- schema: ", { schema })

  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: 10,
      startTime: new Date(),
      endTime: moment().add(1, "days").toDate(),
      body: {
        type, // !important
        title: "Untitled",
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
    console.log("-- submit: ", values)
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

  console.log("-- form: ", { type, state: form.getValues() })

  return (
    <div className={"h-full flex flex-col p-4 bg-black"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full overflow-hidden flex flex-col gap-2"
        >
          <div className={"flex gap-2 py-2"}>
            <div className={"inline-flex items-center"}>
              <Link href={"/"} className={"p-2"}>
                <HomeIcon className={"text-primary w-4 h-4"} />
              </Link>
              <Label className={"text-xl"}>发布新任务️</Label>
              <Label className={"text-xs text-muted-foreground`"}>
                （仅博主可见）️
              </Label>
            </div>

            <div className={"grow"} />

            <Button
              type="submit"
              disabled={submitting}
              size={"sm"}
              className={"h-fit px-6 py-1 "}
              variant={"outline"}
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
              console.log("-- message type changed into: ", value)
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
              <FormField
                control={form.control}
                name="body.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标题</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body.cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>封面（todo）</FormLabel>
                    <FormControl>
                      <Input
                        type={"file"}
                        accept={"image/*"}
                        onChange={async (event) => {
                          const files = event.currentTarget.files
                          if (!files || !files.length) return
                          const data = new FormData()
                          const file = files[0]!
                          data.set("file", file)
                          const res = await fetch("/api/oss/upload", {
                            method: "POST",
                            body: data,
                          })
                          if (!res.ok) {
                            toast.error("上传失败")
                            console.error(res)
                          } else {
                            toast.success("上传成功！")
                            console.log("-- uploaded result: ", res)
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <TabsContent value={MessageType.Task} className={"space-y-4"}>
                <FormField
                  control={form.control}
                  name="body.purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>任务目标</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body.targetUsers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>目标群体</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body.platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>平台渠道</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent
                value={MessageType.TextChoices}
                className={"space-y-4"}
              >
                <FormField
                  control={form.control}
                  name="body.choices"
                  render={({ field: questionField }) => (
                    <FormItem>
                      <FormLabel>
                        选项
                        <span className={"text-muted-foreground text-xs"}>
                          （至少两个）
                        </span>
                      </FormLabel>
                      <FormControl>
                        <TextChoicesInput
                          value={questionField.value}
                          onChange={questionField.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body.multiple"
                  render={({ field }) => (
                    <FormItem>
                      <div className={"flex items-center gap-2"}>
                        <FormLabel>是否多选</FormLabel>
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
              </TabsContent>

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      价值
                      <span className={"text-muted-foreground text-xs"}>
                        （单位：火币）
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        {...field}
                        onChange={(event) => {
                          field.onChange(
                            Math.floor(parseFloat(event.currentTarget.value)),
                          )
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>开始时间</FormLabel>
                    <FormControl>
                      <Input
                        type={"datetime-local"}
                        value={moment(field.value).format(
                          "YYYY-MM-DDThh:mm:ss",
                        )}
                        onChange={(event) => {
                          // console.log("-- onChange: ", event.currentTarget.value);
                          field.onChange(
                            moment(event.currentTarget.value).toDate(),
                          )
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>截止时间</FormLabel>
                    <FormControl>
                      <Input
                        type={"datetime-local"}
                        value={moment(field.value).format(
                          "YYYY-MM-DDThh:mm:ss",
                        )}
                        onChange={(event) => {
                          // console.log("-- onChange: ", event.currentTarget.value);
                          field.onChange(
                            moment(event.currentTarget.value).toDate(),
                          )
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}
