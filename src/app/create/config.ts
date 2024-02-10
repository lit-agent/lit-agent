import { ICreateProduct } from "@/schema/product"
import { ICreateTask } from "@/schema/task"
import moment from "@/lib/datetime"

import { FormFieldType } from "@/schema/form"

export const createTaskData: {
  name: keyof ICreateTask
  label: string
  type: FormFieldType
  description?: string
  default?: any
}[] = [
  { name: "title", label: "标题", type: "string", default: "default title" },
  { name: "images", label: "图片列表", type: "images", default: [] },
  { name: "description", label: "描述", type: "text", default: "" },
  { name: "purpose", label: "任务目标", type: "text", default: "" },
  {
    name: "target",
    label: "目标群体",
    type: "string",
    default: "全体姑的Friends",
  },
  { name: "platform", label: "平台渠道", type: "string", default: "不孤岛" },
  { name: "detail", label: "详情（富文本）", type: "text", default: "" },
  {
    name: "value",
    label: "价值",
    type: "number",
    default: 10,
    description: "（单位：火币）",
  },
  { name: "startTime", label: "开始时间", type: "date", default: new Date() },
  {
    name: "endTime",
    label: "结束时间",
    type: "date",
    default: moment().add(1, "days").toDate(),
  },
  {
    name: "resultOfGroupInvitation",
    label: "限时群聊",
    type: "images",
    default: [],
  },
]

export const createProductData: {
  name: keyof ICreateProduct
  label: string
  type: FormFieldType
  description?: string
  default?: any
}[] = [
  { name: "title", label: "标题", type: "string", default: "default title" },
  {
    name: "description",
    label: "描述",
    type: "text",
    default: "default description",
  },
  { name: "images", label: "图片列表", type: "images", default: [] },
  {
    name: "price",
    label: "定价",
    type: "number",
    description: "以火值（整数）定价（为人民币的10倍）",
    default: 10,
  },
  { name: "total", label: "库存", type: "number", default: 10 },
  { name: "detail", label: "详情", type: "text", default: "default detail" },
  { name: "isOnsite", label: "是否需要线下", type: "boolean", default: false },
  {
    name: "isSelfOperating",
    label: "是否自营",
    type: "boolean",
    default: true,
  },
  {
    name: "isReturnable",
    label: "是否支持退款",
    type: "boolean",
    default: true,
  },
  {
    name: "isReservationRequired",
    label: "是否需要预约",
    type: "boolean",
    default: true,
  },
]
