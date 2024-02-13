"use client"

import { api } from "@/lib/trpc/react"
import { RankItem } from "@/components/user/rank-item"
import { useUser } from "@/hooks/use-user"
import { ChevronDownIcon, ChevronRight, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import { RankingImage } from "@/lib/assets"
import SubPage from "@/components/sub-page"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { TODO } from "@/config"

export default function RankingPage() {
  const { data: users = [] } = api.user.list.useQuery()
  const user = useUser()

  users.sort((a, b) => b.totalEarnedFire - a.totalEarnedFire)
  const rank = users.findIndex((u) => u.id === user?.id) + 1

  return (
    <SubPage title={"社群贡献者"}>
      <div className={"flex flex-col h-full overflow-hidden"}>
        <div className={"flex flex-col items-center grow overflow-auto px-4"}>
          <Image
            src={RankingImage}
            alt={"ranking"}
            width={320}
            height={160}
            className={"w-1/2 my-4"}
          />

          <Badge
            variant={"secondary"}
            className={"inline-flex gap-2 items-center w-fit py-1"}
            onClick={() => {
              toast.info(TODO)
            }}
          >
            如何提高排名？{" "}
            <ChevronRightIcon className={"w-4 h-4 text-muted-foreground"} />
          </Badge>

          {/*<div*/}
          {/*  className={*/}
          {/*    "w-full flex justify-between border-b border-white/10 pb-2 sticky top-0 bg-[#2A2335] z-50"*/}
          {/*  }*/}
          {/*>*/}
          {/*  <div*/}
          {/*    className={*/}
          {/*      "inline-flex items-center gap-1 text-sm text-secondary-foreground"*/}
          {/*    }*/}
          {/*  >*/}
          {/*    当前排名 <ChevronDownIcon className={"text-gray-500 w-4 h-4"} />*/}
          {/*  </div>*/}
          {/*  <div className={"text-muted-foreground text-sm"}>*/}
          {/*    预计 {users.length}人平分*/}
          {/*  </div>*/}
          {/*</div>*/}

          {users.map((user, index) => (
            <RankItem
              n={users.length}
              user={user}
              rank={index + 1}
              key={index}
            />
          ))}
        </div>

        <div className={"shrink-0 bg-[#201B28] px-4"}>
          <RankItem user={user} rank={rank} />
        </div>
      </div>
    </SubPage>
  )
}
