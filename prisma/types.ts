import { IMessageBody } from "@/schema/message"

declare global {
  export namespace PrismaJson {
    export type MessageBody = IMessageBody

    export type TaskResult = {
      type: "GroupInvitation"
      value: string[]
    }

    export type SkuItem = {
      id: string
      count: number
      price: number
    }

    export type ValidationItemAnswer = number[]
  }
}
