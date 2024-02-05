import { z } from "zod";

export enum MessageType {
  Plain = "Plain",
  TextChoices = "TextChoices",

  GroupLink = "GroupLink",
  ProductLink = "ProductLink",
  ImageChoices = "ImageChoices",

  Images = "Images",
  Sheet = "Sheet",

  Others = "Others",
}

export const segmentSchema = z.object({
  type: z.nativeEnum(MessageType),
  content: z.any(),
});

export type Segment = z.infer<typeof segmentSchema>;

export const messageBodySchema = z.discriminatedUnion("type", [
  // 纯图文
  z.object({
    type: z.literal(MessageType.Plain),
    detail: z.string().optional(),
  }),

  // 文字选择题
  z.object({
    type: z.literal(MessageType.TextChoices),
    title: z.string().optional(),
    questions: z.array(z.string()).min(2),
    answer: z.array(z.number()).min(2).optional(), // 可以没有答案
  }),

  // 图片选择题
  z.object({
    type: z.literal(MessageType.ImageChoices),
    title: z.string().optional(),
    questions: z.array(z.string()).min(2),
    answer: z.array(z.number()).min(2).optional(), // 可以没有答案
  }),

  // todo: create task 和 message 有区别
  // 邀请之类
  z.object({
    type: z.literal(MessageType.GroupLink),
    title: z.string().optional(),
    groupId: z.string(),
  }),

  // todo: 需要细化
  z.object({ type: z.literal(MessageType.ProductLink) }),
  z.object({ type: z.literal(MessageType.Images) }),
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
]);
export type IMessageBody = z.infer<typeof messageBodySchema>;

export const sendMessageSchema = z.object({
  channelId: z.string(),
  taskId: z.string().optional(),
  body: messageBodySchema,
});
export type ISendMessage = z.infer<typeof sendMessageSchema>;
