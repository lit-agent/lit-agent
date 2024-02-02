import { DEFAULT_ROOM_ID, JIUGU_AI_ID } from "@/const";
import { prisma } from "@/server/db";

const init = async () => {
  console.log("⏰ initializing database...");
  await prisma.$transaction([
    prisma.user.upsert({
      where: { id: JIUGU_AI_ID },
      create: { id: JIUGU_AI_ID },
      update: {},
    }),
  ]);

  console.log("✅ initialized database.");
};

void init();
