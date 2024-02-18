import { prisma } from "@/lib/db"
import { JIUGU_PHONE, JIUGU_ID, JIUGU_CODE } from "@/config"
import { UserType } from "@prisma/client"
import { SMS_PROVIDER_ID } from "@/lib/sms/config"

export const initUser = async () => {
  const phone = JIUGU_PHONE
  const user = await prisma.user.findUnique({ where: { phone } })
  console.log({ phone })
  if (!user) {
    console.log("[init] creating user: ")
    await prisma.user.create({
      data: {
        id: JIUGU_ID,
        phone,
        validated: true,
        type: UserType.blogger,
        accounts: {
          create: [
            {
              provider: SMS_PROVIDER_ID,
              providerAccountId: phone,
              access_token: JIUGU_CODE,
              type: "credentials",
            },
          ],
        },
      },
    })
  } else {
    console.log("skip since user existed")
  }
}

initUser()
