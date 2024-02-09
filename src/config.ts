import { $Enums, UserType } from "@prisma/client"
import { IUserListView } from "@/schema/user.base"
import UserStatus = $Enums.UserStatus

export const PRIMARY_COLOR = "hsla(17, 100%, 64%, 1)"

export const USER_JIUGU_AI_NAME = "玖姑的AI助手"
export const USER_JIUGU_ID = "jiugu"
export const ADMIN_PHONE = "17766091857"

const userBase: IUserListView = {
  validated: false,
  status: UserStatus.online,
  phone: "",
  name: "",
  type: "user",
  id: "",
  image: "",
  rooms: [],
  honors: [],
}

export const admins: Record<
  "jiugu" | "mark" | "shuyu" | "hading",
  IUserListView
> = {
  jiugu: {
    ...userBase,
    id: USER_JIUGU_ID,
    phone: "13121363847",
    name: "玖姑",
    image: "/image/user/jiugu-avatar.png",
    type: UserType.blogger,
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
export const DEFAULT_USERNAME = "一位不愿透露姓名的神秘用户"
export const TODO = "研发小哥正在加🍗中……"
