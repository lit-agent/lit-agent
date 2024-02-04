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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { $Enums } from ".prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { MinusCircleIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { createTaskSchema } from "@/ds/task";
import { useRouter } from "next/navigation";
import { MessageType } from "@/ds/message";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const CreateTaskWithUserPage = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "Sample Title",
      value: 10,
      startTime: new Date(),
      endTime: moment().add(1, "days").toDate(),
      status: "on",
    },
  });

  const createTask = api.task.create.useMutation();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createTaskSchema>) {
    console.log("-- submit: ", values);

    if (
      values.body.type === MessageType.TextChoices ||
      values.body.type === MessageType.ImageChoices
    ) {
      if (values.body.questions.includes(""))
        return form.setError("body.questions", {
          type: "manual",
          message: "不能有空选项",
        });
    }

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

  const FINISHED = 2;
  console.log("-- data: ", form.getValues());

  return (
    <div className={"h-full flex flex-col p-8 bg-black"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full overflow-hidden flex flex-col gap-2"
        >
          <div className={"flex gap-2 py-2"}>
            <div>
              <Label className={"mt-8 text-xl"}>⭐ 发布新任务 ⭐️</Label>
              <Label className={"my-4 text-xs text-muted-foreground`"}>
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
            defaultValue={MessageType.TextChoices}
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>任务标题</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <TabsContent value={MessageType.TextChoices}>
                <FormField
                  control={form.control}
                  name="body.questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>文字选项</FormLabel>
                      <FormControl>
                        <TextChoicesInput onChange={field.onChange} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value={MessageType.ImageChoices}>
                <FormField
                  control={form.control}
                  name="body.questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>图片选项</FormLabel>
                      <FormControl>
                        <TextChoicesInput onChange={field.onChange} />
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
                    <FormLabel>火币价值</FormLabel>
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

              <TabsContent value={MessageType.Plain}>
                <FormField
                  control={form.control}
                  name="body.content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>详情</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </div>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

const TextChoicesInput = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  const [choices, setChoices] = useState<string[]>(["#1 ", "#2"]);

  useEffect(() => {
    onChange(JSON.stringify(choices));
  }, [JSON.stringify(choices)]);

  return (
    <div className={"flex flex-col gap-2"}>
      {choices.map((choice, index) => (
        <div key={index} className={"flex items-center gap-2"}>
          <Input
            className={"grow"}
            key={index}
            value={choice}
            placeholder={`choice-${index + 1}`}
            onChange={(event) => {
              const newChoices = [...choices];
              newChoices[index] = event.currentTarget.value;
              setChoices(newChoices);
            }}
          />

          <Button
            disabled={choices.length <= 2}
            className={"shrink-0 w-fit h-fit p-0 bg-transparent text-red-800"}
            onClick={(event) => {
              setChoices(choices.filter((choice, i) => i !== index));
            }}
          >
            <MinusCircleIcon />
          </Button>
        </div>
      ))}
      <Button
        onClick={(event) => {
          event.preventDefault();
          setChoices([...choices, ""]);
        }}
        variant={"outline"}
      >
        添加
      </Button>
    </div>
  );
};

export default CreateTaskWithUserPage;
