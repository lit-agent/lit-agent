import { PrismaClient } from "@prisma/client";

import { env } from "@/env";
import { JIUGU_AI_ID } from "@/const";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const init = async () => {
  if (!(await prisma.user.findFirst({ where: { id: JIUGU_AI_ID } }))) {
    console.log("⏰ init user");
    await prisma.user.create({
      data: {
        id: JIUGU_AI_ID,
      },
    });
    console.log("✅ init user");
  }
};

void init();
