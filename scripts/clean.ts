import { prisma } from "@/server/db";

const main = async () => {
  const deleted = await prisma.taskFrom.deleteMany({});
  console.log("-- deleted: ", deleted.count);
};

main();
