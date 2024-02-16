import { IMessageBody } from "@/schema/message"
import { MessageType } from "@/schema/message.base"
import { jiuguAvatar } from "@/config"

export const bodies: IMessageBody[] = [
  {
    type: MessageType.Plain,
    title: "Hello，我是玖姑。欢迎加入我的朋友圈。",
  },
  {
    type: MessageType.Plain,
    title:
      "在这里，你可以通过完成我指定的一些任务来获得火值。火值可以用来兑换我提供的产品和服务。",
  },
  {
    type: MessageType.Plain,
    title: "未来，这里还会有很多惊喜，请期待它们一一与你的见面。",
  },
  {
    type: MessageType.Plain,
    title: "首先，我需要筛选一下真正的我的friend。请回答以下几个问题：",
  },
  {
    type: MessageType.TextChoices,
    title: "玖姑为什么不化妆？（多选）",
    multiple: true,
    choices: [
      { value: "懒的化", checked: true },
      { value: "对颜值自信", checked: true },
      { value: "挑战公众对女性的束缚", checked: true },
    ],
  },
  {
    type: MessageType.TextChoices,
    title: "玖姑的立场是？",
    multiple: false,
    choices: [
      { value: "厌男", checked: false },
      { value: "厌女", checked: false },
      { value: "厌蠢", checked: false },
    ],
  },
  {
    type: MessageType.TextChoices,
    title: "玖姑是否支持彩礼？",
    multiple: false,
    choices: [
      { value: "是", checked: false },
      { value: "否", checked: false },
      { value: "无所谓", checked: true },
    ],
  },
  {
    type: MessageType.TextChoices,
    title: "玖姑的目标是什么？",
    multiple: false,
    choices: [
      { value: "成为世界巨星", checked: true },
      { value: "赚一个小目标", checked: false },
      { value: "环游世界", checked: false },
    ],
  },
]
export const user = jiuguAvatar
export type Validation = Record<number, { date?: Date; value: number[] }>
