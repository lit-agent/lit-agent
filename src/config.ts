import { IMessageContainer } from "@/components/message-item"
import { MessageType } from "@/ds/message.base"
import { BgModel, USER_JIUGU_AI_ID, USER_JIUGU_ID } from "@/const"
import { $Enums, UserType } from "@prisma/client"
import UserStatus = $Enums.UserStatus

const userBase = {
  validated: true,
  status: UserStatus.online,
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: null,
  phoneVerified: null,
  email: null,
  currentBalance: 0,
  historyBalance: 0,
}

export const admins = {
  jiugu: {
    ...userBase,
    id: USER_JIUGU_ID,
    phone: "",
    name: "玖姑",
    image: "/image/user/jiugu-avatar.png",
    type: UserType.blogger,
  },
  jiuguAi: {
    ...userBase,
    id: USER_JIUGU_AI_ID,
    phone: "",
    name: "玖姑的AI助手",
    image: "/image/user/jiugu-avatar.png",
    type: UserType.assistant,
  },
  mark: {
    ...userBase,
    id: "mark",
    phone: "17766091857",
    name: "南川",
    image: "/image/user/mark-wx.png",
    type: UserType.blogger,
  },
  shuyu: {
    ...userBase,
    id: "shuyu",
    phone: "15052382005",
    name: "舒昱",
    image: "/image/user/shuyu-wx.png",
    type: UserType.blogger,
  },
  hading: {
    ...userBase,
    id: "hading",
    phone: "",
    name: "哈丁",
    image: "/image/user/hading-wx.png",
    type: UserType.user,
  },
}

export const genUsers = (n: number) => new Array(n).fill(admins.hading)
export const guidanceItems: IMessageContainer[] = [
  {
    user: admins.jiugu,
    body: {
      type: MessageType.Plain,
      title: "Hello，我是玖姑。欢迎加入我的朋友圈。",
    },
  },

  {
    user: admins.jiugu,
    body: {
      type: MessageType.Plain,
      title:
        "我就是玖姑本姑。因为找我的人太多，我做了个AI助理，帮我处理一些简单问题，比如售后、基本信息。同时我也也会在后台看到你的所有信息，并记录你给我的所有贡献。",
    },
  },

  {
    user: admins.jiuguAi,
    body: {
      type: MessageType.Plain,
      title:
        "Hi 我是姑的AI助理。如果我回答不了你的问题，我会收集整理告诉姑。如果你想直接迅速找到姑，可以花一些火值。你可以通过帮姑把内容转评赞、或完成一些指定任务来获得火值。火值也可以用来兑换其他姑提供的产品和服务。",
    },
  },

  {
    user: admins.jiuguAi,
    body: {
      type: MessageType.Plain,
      title: "首先我先帮姑筛选一下真正的姑的friend。请回答以下几个问题：",
    },
  },

  {
    user: admins.jiuguAi,
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
    user: admins.jiuguAi,
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
    user: admins.jiuguAi,
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
    user: admins.jiuguAi,
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

export const tasks = [
  { name: "在途任务", cnt: 6, hasReminder: true },
  { name: "完成的任务", cnt: 11 },
  { name: "失败的任务", cnt: 11 },
]

export const bgModel: BgModel = "plain"
