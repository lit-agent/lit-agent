"use server"

import { JWT } from "next-auth/jwt"
import { prisma } from "@/lib/db"

export const validateToken = async (token: JWT | null) => {
  if (!token) return token

  const userInDB = await prisma.user.findUnique({ where: { id: token.id } })
  console.log("[token] validated: ", { token, userInDB })

  return userInDB
}
