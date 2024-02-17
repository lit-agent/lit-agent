import { prisma } from "@/lib/db"

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

findWechatAccount("xx", "yy")
