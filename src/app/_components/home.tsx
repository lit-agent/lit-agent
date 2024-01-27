"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Menu1Icon from "../../../public/menu-l.svg";
import FileFillIcon from "../../../public/menu-fire-fill.svg";
import Menu3Icon from "../../../public/menu-r.svg";
import RingIcon from "../../../public/ring.svg";
import AwardFillIcon from "../../../public/award-fill.svg";
import ArrowUpIcon from "../../../public/arrow-up-s-fill 2.svg";
import DirectBoxSendIcon from "../../../public/directbox-send.svg";
import BrandImage from "../../../public/brand.svg";
import { useSystem } from "@/hooks/use-system";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const navs = [
  { Icon: Menu1Icon, alt: "1" },
  { Icon: FileFillIcon, alt: "2" },
  { Icon: Menu3Icon, alt: "3" },
];

export const tasks = [
  { name: "在途任务", cnt: 6, hasReminder: true },
  { name: "完成的任务", cnt: 11 },
  { name: "失败的任务", cnt: 11 },
];

export const Dot = () => {
  return <div className={"h-3 w-3 rounded-full bg-red-600"}></div>;
};

export const ColorPrimary = "hsla(17, 100%, 64%, 1)";

export default function HomePage() {
  const { nav, setNav } = useSystem();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div
        className={
          "bg-background flex w-full grow flex-col gap-6 overflow-auto p-6 sm:p-8"
        }
      >
        <div id={"ring"} className={"ml-auto rounded-full bg-white p-2"}>
          <RingIcon />
        </div>

        <div
          className={
            "relative flex flex-col gap-4 rounded-3xl bg-white p-4 text-black"
          }
        >
          <div>我的火伴卡</div>

          <div className={"flex gap-4"}>
            <div> 昨日收益</div>
            <div className={"text-red-500"}>+ 0.5</div>
          </div>

          <div className={"flex items-center gap-4"}>
            <div className={"text-3xl font-medium"}>4224.23</div>
            <FileFillIcon color={ColorPrimary} />
          </div>

          <div className={"flex items-center gap-4"}>
            <div className={"text-gray-500"}>GDFRIENDXO0001</div>
            <Badge>好火伴</Badge>
            <Badge>Hot火伴</Badge>
          </div>

          <div className={"absolute right-2 top-0"}>
            <BrandImage />
          </div>
        </div>

        <div className={"grid grid-cols-2 gap-2"}>
          <div
            className={
              "flex flex-col gap-2 rounded-3xl bg-white p-4  text-black"
            }
          >
            <div className={"flex items-center "}>
              <div className={"mr-2 text-xs font-thin text-gray-950"}>
                世界排名
              </div>
              <AwardFillIcon />
              <ArrowUpIcon />
              <div>5</div>
            </div>

            <div className={"flex items-center gap-2"}>
              <div className={"text-lg font-medium"}>253</div>
              <div className={"text-gray-500"}>/ 102293</div>
            </div>
          </div>

          <div
            className={
              "relative flex flex-col gap-2 rounded-3xl bg-white p-4 text-black"
            }
          >
            <div className={"flex items-center gap-2 "}>
              <DirectBoxSendIcon />
              <div className={"text-xs font-thin text-gray-950"}>
                本期空投池
              </div>
            </div>

            <div className={"flex items-center gap-2"}>
              <div className={"text-lg font-medium"}>423.15</div>
              <FileFillIcon color={ColorPrimary} />
            </div>

            <div className={"absolute right-4 top-2"}>
              <Dot />
            </div>
          </div>
        </div>

        <Label className={"text-2xl"}>我的任务</Label>
        <div className={"flex flex-col gap-4"}>
          {tasks.map(({ name, cnt, hasReminder }, index) => (
            <div
              key={index}
              className={
                "flex justify-between rounded-lg bg-white px-4 py-3 text-black"
              }
            >
              <span className={"text-lg font-medium"}>{name}</span>

              <div className={"inline-flex items-center gap-2"}>
                {hasReminder && <Dot />}
                {cnt}个
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id={"nav"}
        className={"flex w-full shrink-0 justify-evenly bg-black p-4 sm:p-8"}
      >
        {navs.map(({ Icon, alt }, index) => (
          <div
            key={index}
            className={cn(
              "rounded-[16px] p-2",
              index === nav && "bg-orange-500",
            )}
          >
            <Icon key={index} />
          </div>
        ))}
      </div>
    </main>
  );
}
