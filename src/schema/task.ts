// 任务
import { userViewSchema } from "@/schema/user.base"
import { z } from "zod"
import {
  basicBodySchema,
  MessageType,
  messageViewSchema,
} from "@/schema/message.base"

import { Prisma } from "@prisma/client"
import validator = Prisma.validator
import { roomViewSelector } from "@/schema/room"
import TaskDefaultArgs = Prisma.TaskDefaultArgs
import TaskGetPayload = Prisma.TaskGetPayload
import UserTaskDefaultArgs = Prisma.UserTaskDefaultArgs
import UserTaskGetPayload = Prisma.UserTaskGetPayload

export const createTaskSchema = z.object({
  title: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  detail: z.string(),
  value: z.number(),
  startTime: z.date(),
  endTime: z.date(),
  platform: z.string(),
  target: z.string(),
  purpose: z.string(),
})
export type ICreateTask = z.infer<typeof createTaskSchema>

export const taskViewSchema = validator<TaskDefaultArgs>()({
  include: {
    fromUser: userViewSchema,
    room: {
      select: {
        id: true,
        messages: messageViewSchema,
        users: userViewSchema,
      },
    },
    toUsers: {
      select: {
        user: userViewSchema,
      },
    },
  },
})
export type ITaskView = TaskGetPayload<typeof taskViewSchema>

export const userTaskViewSchema = validator<UserTaskDefaultArgs>()({
  select: {
    task: taskViewSchema,
    status: true,
  },
})
export type IUserTaskView = UserTaskGetPayload<typeof userTaskViewSchema>
