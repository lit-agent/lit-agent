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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { MinusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createTaskSchema } from "@/ds/task";
import { useRouter } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import TaskType = $Enums.TaskType;

const CreateTaskWithUserPage = async () => {
  const user = await getServerAuthSession();

  // 1. Define your form.
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      type: TaskType.broadcast,
      title: "test",
      content: "test content\n\ndata: " + moment().format(),
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

    if (values.type === TaskType.textChoices) {
      const content = form.watch("content");
      const choices = JSON.parse(content) as string[];
      if (choices.includes(""))
        return form.setError("content", {
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

  console.log("-- form: ", { form });

  return (
    <div className={"min-h-full flex flex-col p-8 bg-black"}>
      <Label className={"my-8 text-xl"}>创建任务</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任务类型</FormLabel>
                <FormControl>
                  <Select
                    // 不能用 ...field，因为 select 不支持ref
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择任务类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>基础类型</SelectLabel>
                        {Object.values(TaskType).map((k, index) => (
                          <SelectItem key={index} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>目前仅支持三种（不断更新中）</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {form.watch("type") === TaskType.broadcast && (
            <FormField
              control={form.control}
              name="content"
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
          )}

          {form.watch("type") === TaskType.textChoices && (
            <FormField
              control={form.control}
              name="content"
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
          )}

          {form.watch("type") === TaskType.imageChoices && (
            <FormField
              control={form.control}
              name="content"
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
          )}

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
                    value={moment(field.value).format("YYYY-MM-DDThh:mm:ss")}
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
                    value={moment(field.value).format("YYYY-MM-DDThh:mm:ss")}
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

          <Button type="submit" disabled={submitting} className={"w-full"}>
            提交
          </Button>
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
      >
        添加
      </Button>
    </div>
  );
};

export default CreateTaskWithUserPage;
