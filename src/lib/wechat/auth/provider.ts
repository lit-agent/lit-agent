import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import {
  adaptWechatAuthToken,
  getWechatUserProfile,
  getWechatAuthToken,
} from "@/lib/wechat/auth/funcs/server"
import {
  IWechatAdaptedProfile,
  IWechatAdaptedToken,
  IWechatProfile,
} from "@/lib/wechat/auth/schema"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"
import { getWechatAuthorizationUrl } from "@/lib/wechat/auth/funcs/client"
import { User } from "next-auth"

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
        const wechatToken = await getWechatAuthToken(code!)
        return { tokens: adaptWechatAuthToken(wechatToken) }
      },
    },

    userinfo: {
      // 直接用 url 和 param 是不行的，access_token 等无法自动进去
      // todo: 调查微信与其他的OAuth平台到底有啥不同，需要这么繁琐
      // @ts-ignore
      request: async ({ tokens, client }) => {
        const { id, access_token } = tokens as IWechatAdaptedToken
        return getWechatUserProfile(access_token, id)
      },
    },

    /**
     * 初始化会进 user 表
     * @param profile
     */
    profile: async (profile: IWechatProfile) => {
      const user: User = {
        id: profile.openid,

        // 更新 user 的昵称和照片
        name: profile.nickname,
        image: profile.headimgurl,

        // 更新额外的字段标识
        wechat: profile.openid,
        wechatVerified: new Date(),
      }
      console.log("[next-auth-wechat-provider] called profile: ", {
        profile,
        user,
      })
      return user
    },

    // style: { logo: "/facebook.svg", bg: "#006aff", text: "#fff" },
    options,
  }
}
