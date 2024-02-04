import { IMessageBody } from "@/ds/message";

declare global {
  namespace PrismaJson {
    type MessageBody = IMessageBody;
  }
}
