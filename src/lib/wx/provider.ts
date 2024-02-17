import { getWxProfile, IWxProfile } from "@/lib/wx/functions/get-user-info"
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { WX_PROVIDER_ID, WX_PROVIDER_TYPE } from "@/lib/wx/config"
import { getWxAuthorizationUrl } from "@/lib/wx/utils"
import {
  getWxAccessToken,
  IWxAccessTokenPayload,
} from "@/lib/wx/functions/get-access-token"
import { prisma } from "@/lib/db"
import { userMainViewSchema } from "@/schema/user"

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

    authorization: getWxAuthorizationUrl(),

    token: {
      request: async ({ params: { code } }) => {
        const tokens = (await getWxAccessToken(code!)) as IWxAccessTokenPayload
        return { tokens }
      },
    },

    userinfo: {
      request: async ({ tokens, client }) => {
        const { openid, access_token } = tokens as IWxAccessTokenPayload
        const wxProfile = (await getWxProfile(
          access_token,
          openid,
        )) as IWxProfile
        return {
          ...wxProfile,
          sub: wxProfile.openid,
          name: wxProfile.nickname,
          image: wxProfile.headimgurl,
        }
      },
    },

    profile: async (profile) => {
      const account = await prisma.account.findUniqueOrThrow({
        where: {
          provider_providerAccountId: {
            provider: WX_PROVIDER_ID,
            providerAccountId: profile.openid,
          },
        },
        include: { user: userMainViewSchema },
      })
      return account.user
    },

    // style: { logo: "/facebook.svg", bg: "#006aff", text: "#fff" },
    options,
  }
}
