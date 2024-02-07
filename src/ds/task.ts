// 任务
import { userViewSelector } from "@/ds/user.base"
import { z } from "zod"
import { basicBodySchema, MessageType } from "@/ds/message.base"

import { Prisma } from "@prisma/client"
import validator = Prisma.validator
import { roomViewSelector } from "@/ds/room"
import TaskFromDefaultArgs = Prisma.TaskFromDefaultArgs
import TaskFromGetPayload = Prisma.TaskFromGetPayload

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

export const fireViewSelector = validator<TaskFromDefaultArgs>()({
  select: {
    id: true,
    fromUser: userViewSelector,
    toUsers: {
      select: {
        user: userViewSelector,
      },
    },
    body: true,
    value: true,
    startTime: true,
    endTime: true,
    room: roomViewSelector,
  },
})
export type IFireView = TaskFromGetPayload<typeof fireViewSelector>
