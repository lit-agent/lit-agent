"use client";

import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { HomeIcon } from "lucide-react";
import { useState } from "react";
import { createTaskSchema } from "@/ds/task";
import { useRouter } from "next/navigation";
import { MessageType, SupportedMessageTypes } from "@/ds/message";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TextChoicesInput } from "@/components/input-choices";
import { useUserData } from "@/hooks/use-user-data";

export default function CreateTaskWithUserPage() {
  const { preferredMessageType: type, setPreferredMessageType } = useUserData();

  // 1. Define your form.
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      value: 10,
      startTime: new Date(),
      endTime: moment().add(1, "days").toDate(),
      status: "on",
      body: {
        type,
        title: "Sample Title",
      },
    },
  });

  const createTask = api.task.create.useMutation();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createTaskSchema>) {
    console.log("-- submit: ", values);
    setSubmitting(true);
    createTask
      .mutateAsync(values)
      .then((res) => {
        toast.success("创建成功！");
        // void router.push("/");
      })
      .catch((e) => {
        console.error(e);
        toast.error("创建失败");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const FINISHED = 3;
  console.log("-- data: ", form.getValues());

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
              form.setValue("body.type", value as SupportedMessageTypes);
              setPreferredMessageType(value as MessageType);
            }}
          >
            <TabsList
              className={"flex flex-col  shrink-0 w-1/4 h-full bg-transparent"}
              onChange={(event) => {
                console.log("-- tabs change: ", event);
              }}
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

            <div className={"grow space-y-2"}>
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
                      <Textarea {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <TabsContent value={MessageType.Task}>
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

              <TabsContent value={MessageType.TextChoices}>
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

                <FormField
                  control={form.control}
                  name="body.choices"
                  render={({ field: questionFields }) => (
                    <FormItem>
                      <FormLabel>
                        选项
                        <span className={"text-muted-foreground text-xs"}>
                          （至少两个）
                        </span>
                      </FormLabel>
                      <FormControl>
                        <TextChoicesInput
                          defaultChoices={[
                            { value: "#1 ", checked: false },
                            { value: "#2 ", checked: false },
                          ]}
                          onChoicesChange={questionFields.onChange}
                        />
                      </FormControl>

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
                          );
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
                          );
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
                          );
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
  );
}
