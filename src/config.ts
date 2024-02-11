import { UserType } from "@prisma/client"
import { IUserAvatar } from "@/schema/user.base"

export const JIUGU_ID = "jiugu"
export const JIUGU_AI_NAME = "玖姑的AI助手"
export const JIUGU_PHONE = "13121363847"
export const jiuguAvatar: IUserAvatar = {
  id: JIUGU_ID,
  image: "/image/user/jiugu-avatar.png",
  name: "玖姑",
  type: UserType.blogger,
}
export const JIUGU_TASK_PAGE_TITLE = "姑的广场"
export const JIUGU_PRODUCT_PAGE_TITLE = "姑的商城"

export const PRIMARY_COLOR = "hsla(17, 100%, 64%, 1)"
export const DEFAULT_USERNAME = "一位不愿透露姓名的神秘用户"
export const TODO = "研发小哥正在加🍗中……"
export const MSG_RENAME_LIMITATION = "30天之内只能修改一次！"
export const NEW_USER_REWARD = 10
