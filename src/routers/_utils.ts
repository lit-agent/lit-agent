import { Prisma } from ".prisma/client"
import SortOrder = Prisma.SortOrder

export const descOrder = { orderBy: { updatedAt: SortOrder.desc } }
export const ascOrder = { orderBy: { updatedAt: SortOrder.asc } }
