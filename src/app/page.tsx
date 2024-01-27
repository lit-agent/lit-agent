import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import HomePage from "@/app/_components/home";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return <HomePage />;
}
