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

export const messageBodySchema = z.union([
  // 纯图文
  z.object({
    type: z.literal(MessageType.Plain),
    content: z.string(),
  }),

  // 选择题
  z.object({
    type: z.union([
      z.literal(MessageType.TextChoices),
      z.literal(MessageType.ImageChoices),
    ]),
    title: z.string().optional(),
    questions: z.array(z.string()).min(2),
    // 可以没有答案
    answer: z.array(z.number()).min(2),
  }),

  // 邀请之类
  // todo: 需要细化
  z.object({
    type: z.union([
      z.literal(MessageType.Others),
      z.literal(MessageType.GroupLink),
      z.literal(MessageType.Images),
      z.literal(MessageType.ProductLink),
      z.literal(MessageType.Sheet),
    ]),
    title: z.string(),
    cover: z.string().optional(),
    href: z.string().optional(),
    memberAvatars: z.array(z.string()).optional(),
    membersCount: z.number().optional(),
    hotValue: z.number(),
    datetime: z.date().optional(),
    source: z.string().default("不孤岛"),
  }),
]);
export type IMessageBody = z.infer<typeof messageBodySchema>;

export const sendMessageSchema = z.object({
  channelId: z.string(),
  taskId: z.string().optional(),
  body: messageBodySchema,
});
export type ISendMessage = z.infer<typeof sendMessageSchema>;
