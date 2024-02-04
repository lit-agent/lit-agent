import { Segment } from "@/ds/message";

declare global {
  namespace PrismaJson {
    type MessageBody = Segment[];
  }
}
