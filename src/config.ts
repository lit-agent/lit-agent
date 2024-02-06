import { IMessageContainer } from "@/components/message-item"
import { MessageType } from "@/ds/message.base"
import {
  Choice1Image,
  Choice2Image,
  FireIcon,
  HadingImage,
  JiuguImage,
  Menu1Icon,
  Menu3Icon,
  SampleUser1Image,
} from "@/lib/assets"
import { BgModel, USER_JIUGU_AI_ID } from "@/const"
import { IUserView } from "@/ds/user.base"
import { $Enums } from "@prisma/client"
import UserStatus = $Enums.UserStatus

export const bgModel: BgModel = "plain"

const userBase = {
  validated: true,
  status: UserStatus.online,
  phone: "",
}
export const userJiuguAI: IUserView = {
  id: USER_JIUGU_AI_ID,
  name: "玖姑的AI助理",
  image: JiuguImage.src,
  type: "assistant",
  ...userBase,
}
export const bloggerId: IUserView = {
  id: "jiugu",
  name: "玖姑",
  image: JiuguImage.src,
  type: "blogger",
  ...userBase,
}
export const userHading: IUserView = {
  id: "hading",
  name: "哈丁",
  image: HadingImage.src,
  type: "user",
  ...userBase,
}
export const userSample: IUserView = {
  id: "demo",
  name: "demo",
  image: SampleUser1Image.src,
  type: "user",
  ...userBase,
}
export const genUsers = (n: number) => new Array(n).fill(userSample)
export const sampleImageItems = [Choice1Image.src, Choice2Image.src]
export const guidanceItems: IMessageContainer[] = [
  {
    user: bloggerId,
    body: {
      type: MessageType.Plain,
      title: "Hello，我是玖姑。欢迎加入我的朋友圈。",
    },
  },

  {
    user: bloggerId,
    body: {
      type: MessageType.Plain,
      title:
        "我就是玖姑本姑。因为找我的人太多，我做了个AI助理，帮我处理一些简单问题，比如售后、基本信息。同时我也也会在后台看到你的所有信息，并记录你给我的所有贡献。",
    },
  },

  {
    user: userJiuguAI,
    body: {
      type: MessageType.Plain,
      title:
        "Hi 我是姑的AI助理。如果我回答不了你的问题，我会收集整理告诉姑。如果你想直接迅速找到姑，可以花一些火值。你可以通过帮姑把内容转评赞、或完成一些指定任务来获得火值。火值也可以用来兑换其他姑提供的产品和服务。",
    },
  },

  {
    user: userJiuguAI,
    body: {
      type: MessageType.Plain,
      title: "首先我先帮姑筛选一下真正的姑的friend。请回答以下几个问题：",
    },
  },

  {
    user: userJiuguAI,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑为什么不化妆？（多选）",
      multiple: true,
      choices: [
        { value: "懒的化", checked: true },
        { value: "对颜值自信", checked: true },
        { value: "挑战公众对女性的束缚", checked: true },
      ],
    },
  },

  {
    user: userJiuguAI,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑的立场是？",
      multiple: false,
      choices: [
        { value: "厌男", checked: false },
        { value: "厌女", checked: false },
        { value: "厌蠢", checked: false },
      ],
    },
  },
  {
    user: userJiuguAI,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑是否支持彩礼？",
      multiple: false,
      choices: [
        { value: "是", checked: false },
        { value: "否", checked: false },
        { value: "无所谓", checked: true },
      ],
    },
  },
  {
    user: userJiuguAI,
    body: {
      type: MessageType.TextChoices,
      title: "玖姑的目标是什么？",
      multiple: false,
      choices: [
        { value: "成为世界巨星", checked: true },
        { value: "赚一个小目标", checked: false },
        { value: "环游世界", checked: false },
      ],
    },
  },
]
export const navs = [
  { Icon: Menu1Icon, alt: "1" },
  { Icon: FireIcon, alt: "2" },
  { Icon: Menu3Icon, alt: "3" },
]
export const tasks = [
  { name: "在途任务", cnt: 6, hasReminder: true },
  { name: "完成的任务", cnt: 11 },
  { name: "失败的任务", cnt: 11 },
]
