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
import TaskType = $Enums.TaskType;

const formSchema = z.object({
  type: z.nativeEnum(TaskType),
  content: z.string(),
  value: z.number(),
});

export default function CreateTaskPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: TaskType.broadcast,
      content: "",
      value: 10,
    },
  });

  const { user } = useUser();
  const createTask = api.task.create.useMutation();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("-- submit: ", { values, user });
    if (!user) return;

    createTask
      .mutateAsync(values)
      .then((res) => {
        toast.success("创建成功！");
      })
      .catch((e) => {
        console.error(e);
        toast.error("创建失败");
      });
  }
  u;
  return (
    <div className={"flex flex-col p-8 bg-black"}>
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
                  <Select>
                    <SelectTrigger className="wfull">
                      <SelectValue placeholder="选择任务类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>基础类型</SelectLabel>
                        {Object.keys(TaskType).map((k, index) => (
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任务内容</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>

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
  );
}
