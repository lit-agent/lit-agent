import { prisma } from "../../db"
import fetch from "node-fetch"
import { getServerAuthSession } from "../../auth"
import crypto from "crypto"
import { WECHAT_API_URL, WX_APP_ID, WX_APP_SECRET } from "@/lib/wechat/config"

import singletonTokenInstance from "@/lib/wechat/auth-cyx/token"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

/**
 * 将微信openid关联至已存在的用户账号
 * @param userId 用户id
 * @param openId 用户微信openid
 * @returns
 */
export const bindWxOpenIdToUser = async (openId: string) => {
  const session = await getServerAuthSession()
  if (!session?.user?.id) throw new Error("Fail to get userId")

  const userId = session?.user?.id
  const existingAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: WECHAT_PROVIDER_ID,
        providerAccountId: openId,
      },
    },
  })
  console.log(`existing account: `, existingAccount)
  if (existingAccount) return existingAccount

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  console.log(`existing user: `, existingAccount)
  if (!existingUser)
    throw new Error("User not found, cannot create wechat account")

  const createdAccount = await prisma.account.create({
    data: {
      provider: WECHAT_PROVIDER_ID,
      providerAccountId: openId,
      type: "oauth",
      user: {
        connect: { id: userId },
      },
    },
  })
  console.log(`created user: `, createdAccount)

  return createdAccount
}

/**
 * 获取用户微信openid
 * @param code 用户同意授权后获取code
 * @returns 用户微信openid
 */
export const getOpenId = async (code: string) => {
  const requestUrl = `${WECHAT_API_URL}/sns/oauth2/access_token?appid=${WX_APP_ID}&secret=${WX_APP_SECRET}&code=${code}&grant_type=authorization_code`

  const response = await fetch(requestUrl)
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
  }
  const data = (await response.json()) as { openid: string }
  console.log(`getOpenId data:${JSON.stringify(data)}`)
  // 检查响应中是否有openid
  if (data.openid) {
    return data.openid
  } else {
    console.error("OpenID not found in response:", data)
    return null
  }
}

const createNonceStr = () => {
  return Math.random().toString(36).substr(2, 15)
}

const createTimestamp = () => {
  return Math.floor(Date.now() / 1000) + ""
}

const raw = (args) => {
  var keys = Object.keys(args)
  keys = keys.sort()
  var newArgs = {}
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key]
  })

  var string = ""
  for (var k in newArgs) {
    string += "&" + k + "=" + newArgs[k]
  }
  string = string.substr(1)
  return string
}

/**
 * @synopsis 签名算法
 *
 * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
 *
 * @returns
 */
export const sign = (url: string) => {
  var ret = {
    jsapi_ticket: singletonTokenInstance.getJsapiTicket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url,
  } as any
  var string = raw(ret)
  const hash = crypto.createHash("sha1")
  ret.signature = hash.update(string).digest("hex")
  return ret
}

export const findWechatAccount = async (wxid: string, userId: string) => {
  console.log("-- finding: ", userId)

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { accounts: true },
  })
  if (!user) throw new Error("用户ID不存在")

  const account = user.accounts.find(
    (account) =>
      account.provider === "wechat" && account.providerAccountId === wxid,
  )
  if (!account) throw new Error("用户的微信ID不存在")

  // const account = user.accounts[0]!
  const providerId = account.providerAccountId // openid
}
