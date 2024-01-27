import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Image from "next/image";

import MenuLIcon from "../../public/menu-l.svg";
import MenuRIcon from "../../public/menu-r.svg";
import MenuMiddleIcon from "@/../public/menu-fire-fill.svg";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className={"grow"}></div>

      <div className={"flex w-full shrink-0 justify-between p-4"}>
        <Image src={MenuLIcon} alt={"menu-l"} />
        <Image src={MenuMiddleIcon} alt={"menu-middle"} />
        <Image src={MenuRIcon} alt={"menu-r"} />
      </div>
    </main>
  );
}
