import { getWxProfile, IWxProfile } from "@/lib/wx/functions/get-user-info"
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { WX_PROVIDER_ID, WX_PROVIDER_TYPE } from "@/lib/wx/config"
import { getWxAuthorizationUrl } from "@/lib/wx/utils"
import {
  getWxAccessToken,
  IWxAccessTokenPayload,
} from "@/lib/wx/functions/get-access-token"

if (!global.authorizationUrl) {
  global.authorizationUrl = getWxAuthorizationUrl()
}
const authorizationUrl = global.authorizationUrl

/**
 * ref:
 * 1. https://github.com/nextauthjs/next-auth/issues/5937
 * 2. node_modules/next-auth/src/providers/facebook.ts
 */
export default function WechatProvider<P extends IWxProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: WX_PROVIDER_ID,
    name: "wx-auth",
    type: WX_PROVIDER_TYPE,

    authorization: authorizationUrl,

    token: {
      request: async ({ params: { code } }) => {
        const tokens = (await getWxAccessToken(code!)) as IWxAccessTokenPayload
        console.log("[wx-auth] token: ", { code, tokens })
        return { tokens }
      },
    },

    userinfo: {
      // @ts-ignore
      request: async ({ tokens, client }) => {
        const { openid, access_token } = tokens as IWxAccessTokenPayload
        const userinfo = (await getWxProfile(
          access_token,
          openid,
        )) as IWxProfile
        console.log("[wx-auth] userinfo: ", { tokens, userinfo })
        return userinfo
      },
    },

    profile: async (profile: IWxProfile) => ({
      id: profile.openid,
      name: profile.nickname,
      image: profile.headimgurl,
    }),

    // style: { logo: "/facebook.svg", bg: "#006aff", text: "#fff" },
    options,
  }
}
