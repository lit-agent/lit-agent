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
import { useUser } from "@/hooks/use-user";
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
import { TaskFromUncheckedCreateInputSchema } from "../../../../prisma/generated/zod";
import { useState } from "react";
import TaskType = $Enums.TaskType;
import { MinusCircleIcon } from "lucide-react";

const formSchema = TaskFromUncheckedCreateInputSchema;

export default function CreateTaskPage() {
  const { user } = useUser();
  if (!user) return "loading";
  return <CreateTaskWithUserPage userId={user.id} />;
}

const CreateTaskWithUserPage = ({ userId }: { userId: string }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: TaskType.broadcast,
      title: "test - " + moment().format(),
      content: "test content",
      value: 10,
      startTime: new Date(),
      endTime: moment().add(1, "days").toDate(),
      status: "on",
      fromUserId: userId,
    },
  });

  const createTask = api.task.create.useMutation();
  const [submitting, setSubmitting] = useState(false);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    createTask
      .mutateAsync(values)
      .then((res) => {
        toast.success("创建成功！");
      })
      .catch((e) => {
        console.error(e);
        toast.error("创建失败");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  console.log("-- form: ", { userId, form });

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
                  <Textarea {...field} />
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
                      field.onChange(Math.floor(event.currentTarget.value));
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
  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    onChange(JSON.stringify(choices));
  }, [JSON.stringify(choices)]);

  return (
    <>
      {choices.map((choice, index) => (
        <div key={index} className={"flex items-center gap-2"}>
          <Input
            className={"grow"}
            key={index}
            value={choice}
            onChange={(event) => {
              const newChoices = [...choices];
              newChoices[index] = event.currentTarget.value;
              setChoices(newChoices);
            }}
          />

          <MinusCircleIcon
            className={"shrink-0 text-red-800"}
            onClick={(event) => {
              setChoices(choices.filter((choice, i) => i !== index));
            }}
          />
        </div>
      ))}
      <Button onClick={(event) => {}} />
      添加
      <Button />
    </>
  );
};
