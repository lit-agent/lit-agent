export type WxError = {
  errcode: number
  errmsg: string
} // e.g. {"errcode":40029,"errmsg":"invalid code"}
export type WxRes<T extends object> = T | WxError
export const isWxError = <T extends object>(res: WxRes<T>): res is WxError =>
  "errcode" in res
