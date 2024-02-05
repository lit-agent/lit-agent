import { z } from "zod";
import { createRequirementBodySchema } from "@/ds/requirement";

export type IMessageBody = z.infer<typeof createRequirementBodySchema>;
export const sendMessageSchema = z.object({
  channelId: z.string(),
  taskId: z.string().optional(),
  body: createRequirementBodySchema,
});
