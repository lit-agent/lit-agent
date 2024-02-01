import { PrismaClient } from "@prisma/client";

import { env } from "@/env";
import { JIUGU_AI_ID } from "@/const";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

const init = async () => {
  if (!(await db.user.findFirst({ where: { id: JIUGU_AI_ID } }))) {
    console.log("⏰ init user");
    await db.user.create({
      data: {
        id: JIUGU_AI_ID,
      },
    });
    console.log("✅ init user");
  }
};

void init();
