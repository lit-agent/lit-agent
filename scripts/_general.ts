import { prisma } from "@/lib/db"
import { ADMIN_PHONE } from "@/config"

export const fetchAdminUser = () =>
  prisma.user.findUnique({
    where: { phone: ADMIN_PHONE },
  })
