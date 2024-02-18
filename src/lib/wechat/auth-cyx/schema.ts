export interface GetAccessTokenResponse {
  // 获取到的凭证
  access_token: string
  // 凭证有效时间，单位：秒
  expires_in: Number
  errcode?: Number
  errmsg?: string
}
