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
