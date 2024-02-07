// 任务
import { userListViewSchema } from "@/schema/user.base"
import { z } from "zod"
import { basicBodySchema, MessageType } from "@/schema/message.base"

import { Prisma } from "@prisma/client"
import validator = Prisma.validator
import { roomViewSelector } from "@/schema/room"
import TaskDefaultArgs = Prisma.TaskDefaultArgs
import TaskGetPayload = Prisma.TaskGetPayload

export const createTaskRequirementBodySchema = basicBodySchema
  .extend({ type: z.literal(MessageType.Task) })
  .extend({
    platform: z.string(),
    targetUsers: z.string(),
    purpose: z.string(),
  })
export type ICreateTaskRequirementBody = z.infer<
  typeof createTaskRequirementBodySchema
>

export const taskViewSelector = validator<TaskDefaultArgs>()({
  select: {
    id: true,
    fromUser: userListViewSchema,
    toUsers: {
      select: {
        user: userListViewSchema,
      },
    },
    body: true,
    value: true,
    startTime: true,
    endTime: true,
    room: roomViewSelector,
  },
})
export type ITaskView = TaskGetPayload<typeof taskViewSelector>
