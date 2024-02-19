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
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"
import { WECHAT_API_URL } from "@/lib/wechat/config"

/**
 * ref:
 * 1. https://github.com/nextauthjs/next-auth/issues/5937
 * 2. node_modules/next-auth/src/providers/facebook.ts
 */
export default function WechatProvider<P extends IWechatAdaptedProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: WECHAT_PROVIDER_ID,
    name: "wx-auth",
    type: "oauth", // fixed

    authorization: getWechatAuthorizationUrl(),

    token: {
      request: async ({ params: { code } }) => {
        const wechatToken = await getWechatToken(code!)
        return { tokens: adaptWechatToken(wechatToken) }
      },
    },

    userinfo: {
      // 直接用 url 和 param 是不行的，access_token 等无法自动进去
      // todo: 调查微信与其他的OAuth平台到底有啥不同，需要这么繁琐
      // url: WECHAT_API_URL + "/sns/userinfo",
      // params: {
      //   lang: "zh_CN",
      // },
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
