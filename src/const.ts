export const PHONE_REGEX = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){10,}$/,
)
export const PRIMARY_COLOR = "hsla(17, 100%, 64%, 1)"
export const SMS_EXPIRE_MINUTES = 10
export const USER_AI_FOR_ALL_ID = "ai"
export const USER_JIUGU_AI_ID = "jiugu-ai"
export const USER_JIUGU_AI_NAME = "玖姑的AI助手"
export const USER_JIUGU_ID = "jiugu"
export const ADMIN_PHONE = "17766091857"

export type BgModel = "plain" | "mirror"
export const UPLOAD_FILES_FIELD = "files"

// export const OSS_BUCKET_NAME = "mark-general-lf"
export const OSS_BUCKET_NAME = "mark-vue-oss"
export const OSS_REGION = "oss-cn-hangzhou"
export const OSS_DOMAIN = `https://${OSS_BUCKET_NAME}.${OSS_REGION}.aliyuncs.com/`
// export const DATETIME_FORMAT = "YYYY-MM-DDThh:mm:ss.SSS"
export const DATETIME_FORMAT = "YYYY-MM-DDThh:mm"
