import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

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
  if (!(await db.user.findFirst({ where: { id: "jiugu-ai" } }))) {
    console.log("⏰ init user");
    await db.user.create({
      data: {
        id: "jiuku-ai",
      },
    });
    console.log("✅ init user");
  }
};

void init();
