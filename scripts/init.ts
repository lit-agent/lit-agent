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

    prisma.room.upsert({
      where: { id: DEFAULT_ROOM_ID },
      create: { id: DEFAULT_ROOM_ID },
      update: {},
    }),

    prisma.product.upsert({
      where: { id: "default" },
      create: {
        issuerId: JIUGU_AI_ID,
        price: 99,
        title: "和玖姑一起吃顿饭",
        isOnsite: true,
        isReturnable: false,
        isReservationRequired: true,
        isSelfOperating: true,
        surplus: 30,
        // todo:
        favors: {
          connect: [],
        },
        tobuyers: {
          connect: [],
        },
        buyers: {
          connect: [],
        },

        detail: "xxx",
        images: ["/product-1.png"],
        description:
          "兑换完可以预约一个具体的时间，我们一起吃饭，吃饭的地点你定！\n" +
          "\n" +
          "这里可以写任何文字，如想对粉丝说的一句话，一些注意事项，或者是自己带货产品的试用感受等等，由博主自己发挥就行！",
      },
      update: {},
    }),
  ]);

  console.log("✅ initialized database.");
};

void init();
