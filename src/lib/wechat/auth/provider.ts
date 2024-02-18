import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import {
  adaptWechatProfile,
  adaptWechatToken,
  getWechatAuthorizationUrl,
  getWechatProfile,
  getWechatToken,
} from "@/lib/wechat/auth/functions"
import {
  IWechatAdaptedProfile,
  IWechatAdaptedToken,
} from "@/lib/wechat/auth/schema"
import { WECHAT_AUTH_PROVIDER_ID } from "@/lib/wechat/auth/config"

if (!global.authorizationUrl) {
  global.authorizationUrl = getWechatAuthorizationUrl()
}
const authorizationUrl = global.authorizationUrl

/**
 * ref:
 * 1. https://github.com/nextauthjs/next-auth/issues/5937
 * 2. node_modules/next-auth/src/providers/facebook.ts
 */
export default function WechatProvider<P extends IWechatAdaptedProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: WECHAT_AUTH_PROVIDER_ID,
    name: "wx-auth",
    type: "oauth", // fixed

    authorization: authorizationUrl,

    token: {
      request: async ({ params: { code } }) => {
        const wechatToken = await getWechatToken(code!)
        return { tokens: adaptWechatToken(wechatToken) }
      },
    },

    userinfo: {
      request: async ({ tokens, client }) => {
        const { id, access_token } = tokens as IWechatAdaptedToken
        const wechatProfile = await getWechatProfile(access_token, id)
        return adaptWechatProfile(wechatProfile)
      },
    },

    profile: async (profile: IWechatAdaptedProfile) => {
      const adaptedProfile = {
        id: profile.openid,
        name: profile.nickname,
        image: profile.headimgurl,
      }
      console.log("[next-auth-wechat-provider] called profile: ", {
        profile,
        adaptedProfile,
      })
      return adaptedProfile
    },

    // style: { logo: "/facebook.svg", bg: "#006aff", text: "#fff" },
    options,
  }
}
