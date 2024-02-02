import { RiFireFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { userHading } from "@/ds/mock";
import { ChevronRightIcon } from "lucide-react";
import AvatarComp from "@/components/avatar";

export default function FirePage() {
  const userNew = userHading;

  // todo: db data
  const data = {
    userNew: userHading,
    capital: 1093,
    ranking: 355,
    // todo: 需要更好的数据结构
    buyers: Array(132).fill(userHading),
  };

  return (
    <div className={"bg-[#282232] h-full p-2"}>
      <div className={"flex flex-col items-center gap-4 p-4"}>
        <div className={"flex items-center gap-1 text-xs"}>
          <Avatar className={"w-4 h-4"}>
            <AvatarImage src={userHading.image!} />
          </Avatar>
          {maskName(userNew.name!)}
          <span className={"text-gray-500"}>完成了作品传播任务</span>
        </div>

        <div
          className="radial-progress text-primary "
          style={{ "--value": 70, "--size": "10rem" }}
          role="progressbar"
        >
          <div className={"flex items-center flex-col"}>
            <RiFireFill />
            <div className={"text-primary text-2xl"}>{data.capital}</div>
            <div className={"text-gray-300 text-xs"}>本期空投奖励</div>
          </div>
        </div>

        <div
          className={
            "flex items-center  text-white rounded-full px-4 py-2 text-md"
          }
        >
          期满后
          <span className={"text-primary mx-1"}>{data.buyers.length}</span>
          人平分奖励 <ChevronRightIcon size={12} className={"ml-1"} />
        </div>

        <AvatarComp users={data.buyers} />

        <div
          className={
            "flex items-center bg-[#3D3847] text-gray-500 rounded-full px-4 py-2 text-xs"
          }
        >
          我当前排名
          <span className={"text-gray-300 mx-1"}>{data.ranking}</span>
          <ChevronRightIcon size={12} className={"ml-1"} />
        </div>
      </div>
    </div>
  );
}

const maskName = (s: string) => s[0] + s.slice(1).replace(/./g, "*");
