import moment from "moment"
// @ts-ignore
import locale from "moment/locale/zh-cn"

moment.updateLocale("zh-cn", locale)

export default moment

export const DATETIME_FORMAT = "YYYY-MM-DDThh:mm" // 根据MDN，日期选择组件只能精确到分钟，否则舒昱的iPhone 15 safari上会报错
