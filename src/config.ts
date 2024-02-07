import { $Enums, User, UserType } from "@prisma/client"
import UserStatus = $Enums.UserStatus

export const PRIMARY_COLOR = "hsla(17, 100%, 64%, 1)"
export const USER_AI_FOR_ALL_ID = "ai"
export const USER_JIUGU_AI_ID = "jiugu-ai"
export const USER_JIUGU_AI_NAME = "玖姑的AI助手"
export const USER_JIUGU_ID = "jiugu"
export const ADMIN_PHONE = "17766091857"

const userBase: Omit<User, "id" | "name" | "phone" | "image" | "type"> = {
  validated: false,
  status: UserStatus.online,
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: null,
  phoneVerified: null,
  email: null,
  totalEarnedFire: 0,
  currentEarnedFire: 0,
  balance: 0,
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
