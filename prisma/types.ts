import { IMessageBody } from "@/schema/message"

declare global {
  export namespace PrismaJson {
    export type MessageBody = IMessageBody

    export type TaskResult = {
      type: "GroupInvitation"
      value: string[]
    }
  }
}
