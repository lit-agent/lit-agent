"use client";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Assets from "./assets";
import { tasks } from "@/ds/system";
import { PRIMARY_COLOR } from "@/const";
import { BottomNavbar } from "@/components/navbar";
import Image from "next/image";
import { ArrowUpIcon } from "lucide-react";

export const Dot = () => {
  return <div className={"h-3 w-3 rounded-full bg-red-600"}></div>;
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div
        className={
          "bg-background flex w-full grow flex-col gap-6 overflow-auto p-6 sm:p-8"
        }
      >
        <div id={"ring"} className={"ml-auto rounded-full bg-white p-2"}>
          <Assets.RingIcon />
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
            <Assets.Firecon color={PRIMARY_COLOR} />
          </div>

          <div className={"flex items-center gap-4"}>
            <div className={"text-gray-500"}>GDFRIENDXO0001</div>
            <Badge>好火伴</Badge>
            <Badge>Hot火伴</Badge>
          </div>

          <div className={"absolute right-2 top-0"}>
            <Image
              src={Assets.BrandImage}
              alt={"brand"}
              width={120}
              height={120}
            />
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
              <Assets.AwardFillIcon />
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
              <Assets.DirectBoxSendIcon />
              <div className={"text-xs font-thin text-gray-950"}>
                本期空投池
              </div>
            </div>

            <div className={"flex items-center gap-2"}>
              <div className={"text-lg font-medium"}>423.15</div>
              <Assets.Firecon color={PRIMARY_COLOR} />
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

      <BottomNavbar />
    </main>
  );
}
