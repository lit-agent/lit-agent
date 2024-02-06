import { z } from "zod"
import { Prisma, TaskStatus } from "@prisma/client"
import {
  basicBodySchema,
  choicesBodySchema,
  MessageType,
} from "@/ds/message.base"
import validator = Prisma.validator
import TaskFromDefaultArgs = Prisma.TaskFromDefaultArgs
import { userViewSelector } from "@/ds/user.base"

// 纯图文
export const createPlainRequirementBodySchema = basicBodySchema.extend({
  type: z.literal(MessageType.Plain),
})

// 文字选择题
export const createTextChoicesRequirementBodySchema = choicesBodySchema.extend({
  type: z.literal(MessageType.TextChoices),
})

// 图片选择题
export const createImageChoicesRequirementBodySchema = choicesBodySchema.extend(
  {
    type: z.literal(MessageType.ImageChoices),
  },
)

// 任务
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
export const taskViewSelector = validator<TaskFromDefaultArgs>()({
  select: {
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
  },
})

export const createRequirementBodySchema = z.discriminatedUnion("type", [
  createPlainRequirementBodySchema,
  createTextChoicesRequirementBodySchema,
  createImageChoicesRequirementBodySchema,
  createTaskRequirementBodySchema,

  // todo: create task 和 message 有区别
  // 邀请之类
  basicBodySchema.extend({
    type: z.literal(MessageType.GroupLink),
    groupId: z.string(),
  }),

  z.object({ type: z.literal(MessageType.Images) }).extend({
    images: z.array(z.string()).min(1),
  }),

  // todo: 需要细化
  z.object({ type: z.literal(MessageType.ProductLink) }),
  z.object({ type: z.literal(MessageType.Sheet) }),
  z.object({ type: z.literal(MessageType.Others) }),
  //   title: z.string(),
  //   cover: z.string().optional(),
  //   href: z.string().optional(),
  //   memberAvatars: z.array(z.string()).optional(),
  //   membersCount: z.number().optional(),
  //   hotValue: z.number(),
  //   datetime: z.date().optional(),
  //   source: z.string().default("不孤岛"),
])

export const createRequirementSchema = z
  .object({
    value: z.number(),
    startTime: z.date(),
    endTime: z.date(),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.on),
  })
  .extend({
    body: createRequirementBodySchema,
  })
