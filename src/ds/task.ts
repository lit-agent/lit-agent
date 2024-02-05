import { z } from "zod";
import { TaskStatus } from ".prisma/client";
import { messageBodySchema } from "@/ds/message";

export const createTaskSchema = z.object({
  body: messageBodySchema,

  value: z.number(),
  startTime: z.date(),
  endTime: z.date(),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.on),
});
