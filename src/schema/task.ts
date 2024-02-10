// 任务
import { userListViewSchema } from "@/schema/user.base"
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
  resultOfGroupInvitation: z.array(z.string()).optional(),
})
export type ICreateTask = z.infer<typeof createTaskSchema>

export const taskListViewSchema = validator<TaskDefaultArgs>()({
  include: {
    fromUser: userListViewSchema,
    room: {
      select: {
        id: true,
        messages: messageViewSchema,
        users: userListViewSchema,
      },
    },
    toUsers: {
      select: {
        user: userListViewSchema,
      },
    },
  },
})
export type ITaskView = TaskGetPayload<typeof taskListViewSchema>

export const userTaskViewSchema = validator<UserTaskDefaultArgs>()({
  include: {
    user: userListViewSchema,
    task: taskListViewSchema,
  },
})
export type IUserTaskView = UserTaskGetPayload<typeof userTaskViewSchema>
