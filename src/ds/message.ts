import { z } from "zod";

export enum SegmentType {
  text = "text",
  imageChoices = "imageChoices",
  textChoices = "textChoices",
  groupLink = "groupLink",
  expiringGroupLink = "expiringGroupLink",
  task = "task",
  actionButton = "actionButton",
  images = "images",
  sheet = "sheet",
  productLink = "productLink",
  any = "any",
}

export const segmentSchema = z.object({
  type: z.nativeEnum(SegmentType),
  content: z.any(),
});

export type Segment = z.infer<typeof segmentSchema>;
export const sendMessageSchema = z.object({
  channelId: z.string(),
  body: z.array(segmentSchema),
  taskId: z.string().optional(),
});
