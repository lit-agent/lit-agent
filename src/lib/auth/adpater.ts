import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const myAdapter: typeof PrismaAdapter = (prisma) => {
  const { createUser, ...funcs } = PrismaAdapter(prisma)

  const myCreateUser = (user) => {
    console.log("\n---\n[createUser]: ", user, "\n---\n")
    return createUser!(user)
  }

  return {
    createUser: myCreateUser,
    ...funcs,
  }
}
