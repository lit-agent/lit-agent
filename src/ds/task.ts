import { z } from "zod";
import { TaskType } from "@prisma/client";
import { TaskStatus } from ".prisma/client";

export const createTaskSchema = z.object({
  type: z.nativeEnum(TaskType),
  title: z.string(),
  content: z.string(),
  value: z.number(),
  startTime: z.date(),
  endTime: z.date(),
  status: z.nativeEnum(TaskStatus),
  fromUserId: z.string(),
  choices: z.array(z.string()).optional(),
});
