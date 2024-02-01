import { PrismaClient } from "@prisma/client";

import { env } from "@/env";
import { DEFAULT_ROOM_ID, JIUGU_AI_ID } from "@/const";

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
  console.log("⏰ initializing database...");
  await prisma.$transaction([
    prisma.user.upsert({
      where: { id: JIUGU_AI_ID },
      create: { id: JIUGU_AI_ID },
      update: {},
    }),

    prisma.room.upsert({
      where: { id: DEFAULT_ROOM_ID },
      create: { id: DEFAULT_ROOM_ID },
      update: {},
    }),
  ]);

  console.log("✅ initialized database.");
};

void init();
