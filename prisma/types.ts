import { IMessageBody } from "@/schema/message"

declare global {
  namespace PrismaJson {
    type MessageBody = IMessageBody
  }
}
