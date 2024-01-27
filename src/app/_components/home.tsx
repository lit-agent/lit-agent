"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Menu1Icon from "../../../public/menu-l.svg";
import Menu2Icon from "../../../public/menu-fire-fill.svg";
import Menu3Icon from "../../../public/menu-r.svg";
import { useSystem } from "@/hooks/use-system";

const navs = [
  { icon: Menu1Icon, alt: "1" },
  { icon: Menu2Icon, alt: "2" },
  { icon: Menu3Icon, alt: "3" },
];

export default function HomePage() {
  const { nav, setNav } = useSystem();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className={"bg-background grow overflow-auto"}></div>

      <div
        id={"nav"}
        className={"flex w-full shrink-0 justify-evenly bg-black p-4 sm:p-8"}
      >
        {navs.map(({ icon, alt }, index) => (
          <div
            key={index}
            className={cn(
              "rounded-[16px] p-2",
              index === nav && "bg-orange-500",
            )}
          >
            <Image src={icon} alt={alt} key={index} />
          </div>
        ))}
      </div>
    </main>
  );
}
