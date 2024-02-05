import { z } from "zod";

export enum MessageType {
  Task = "Task",
  Plain = "Plain",
  TextChoices = "TextChoices",

  GroupLink = "GroupLink",
  ProductLink = "ProductLink",
  ImageChoices = "ImageChoices",

  Images = "Images",
  Sheet = "Sheet",

  Others = "Others",
}

export type SupportedMessageTypes =
  | MessageType.Plain
  | MessageType.TextChoices
  | MessageType.Task;

export const segmentSchema = z.object({
  type: z.nativeEnum(MessageType),
  content: z.any(),
});

export type Segment = z.infer<typeof segmentSchema>;

export const basicBodySchema = z.object({
  title: z.string().optional(),
  cover: z.string().optional(),
});

export const choiceItemSchema = z.object({
  value: z.string(),
  checked: z.boolean().optional(),
});
export type IChoiceItem = z.infer<typeof choiceItemSchema>;

export const choicesBodySchema = basicBodySchema.extend({
  choices: z.array(choiceItemSchema).min(2),
  multiple: z.boolean().default(false),
});
export type IChoiceBody = z.infer<typeof choicesBodySchema>;

export const messageBodySchema = z.discriminatedUnion("type", [
  // 纯图文
  basicBodySchema.extend({ type: z.literal(MessageType.Plain) }),

  // 文字选择题
  choicesBodySchema.extend({
    type: z.literal(MessageType.TextChoices),
  }),

  // 图片选择题
  choicesBodySchema.extend({
    type: z.literal(MessageType.ImageChoices),
  }),

  basicBodySchema.extend({ type: z.literal(MessageType.Task) }).extend({
    platform: z.string().default("不孤岛"),
    targetUsers: z.string().default("全体姑的Friends"),
    purpose: z
      .string()
      .default(
        "1. 在视频号里看完我这条短视频作品\n" +
          "2. 点赞、评论、转发、收藏该作品，帮助作品更好的传播",
      ),
  }),

  // todo: create task 和 message 有区别
  // 邀请之类
  basicBodySchema.extend({
    type: z.literal(MessageType.GroupLink),
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
